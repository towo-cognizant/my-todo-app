'use server'

import { SQLOutputValue } from 'node:sqlite';

import { ApiError, Item, Items } from '@/types';

import { getStatement } from './shared';
import { getToken } from './auth';

/**
 * Fetches all items assigned to the currently logged-in user
 * @returns Promise<Items> List of user's items
 */
export async function read(): Promise<Items> {
  return getToken()
    .then(
      (token: string) => {
        return getStatement(`
          SELECT todo.* 
          FROM todo 
          JOIN users ON (todo.user_id = users.id) 
          WHERE users.token = ?
        `).all(token).map((row: Record<string, SQLOutputValue>) => (
          {
            id: row.id,
            text: row.text,
            done: row.done !== 0,
          } as Item
        ));
      }
    )
}

export async function add(text: string): Promise<void> {
  return getToken()
    .then(
      (token: string) => {
        const userId = getStatement(`
          SELECT id
          FROM users
          WHERE token = ?
        `).get(token);

        if (userId === undefined || userId.id === undefined) {
          return Promise.reject(ApiError.badToken);
        }

        const result = getStatement(`
          INSERT INTO todo (
            text, done, user_id
          ) VALUES (
           ?, 0, ?
          )
        `).run(text, userId.id);

        if (result.changes === 1) {
          return Promise.resolve();
        } else {
          return Promise.reject(ApiError.insertCount);
        }
      }
    );
}

/**
 * Updates entry text and sets done flag to false
 * @param id number todo.id
 * @param text string todo.text
 * @returns Promise resolved with an empty string upon success, rejected with reason otherwise
 */
export async function update(id: number, text: string): Promise<void> {
  return getToken()
    .then(
      (token: string) => {
        const result = getStatement(`
          UPDATE todo
          SET text = ?, done = 0
          WHERE id = ?
          AND user_id IN (
            SELECT id
            FROM users
            WHERE token = ?
          )
        `).run(text, id, token);

        if (result.changes === 1) {
          return Promise.resolve();
        } else {
          return Promise.reject(ApiError.updateCount);
        }
      }
    );
}

/**
 * Toggles the done flag of selected item
 * @param id number todo.id
 * @returns Promise resolved with an empty string upon success, rejected with reason otherwise
 */
export async function toggle(id: number): Promise<void> {
  return getToken()
    .then(
      (token: string) => {
        const result = getStatement(`
          UPDATE todo
          SET done = 1 - done
          WHERE id = ?
          AND user_id IN (
            SELECT id
            FROM users
            WHERE token = ?
          )
        `).run(id, token);

        if (result.changes === 1) {
          return Promise.resolve();
        } else {
          return Promise.reject(ApiError.updateCount);
        }
      }
    );
}

export async function remove(id: number): Promise<void> {
  return getToken()
    .then((token: string) => {
      const result = getStatement(`
        DELETE FROM todo
        WHERE id = ?
        AND user_id IN (
          SELECT id
          FROM users
          WHERE token = ?
        )
      `).run(id, token)

      if (result.changes === 1) {
          return Promise.resolve();
        } else {
          return Promise.reject(ApiError.deleteCount);
        }
    })
}

