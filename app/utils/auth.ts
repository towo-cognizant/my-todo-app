'use server'

import { cookies } from 'next/headers';

import { ApiError } from '@/types';

import { getCookie, setCookie, getStatement, getHash, generateToken } from './shared';

const TOKEN_COOKIE_NAME = 'token';

export async function register(login: string, password: string): Promise<void> {
  const hash = getHash(password);

  try {
    const result = getStatement(`
      INSERT INTO users (
        login, password
      ) VALUES (
        ?, ?
      )
    `).run(login, hash);

    if (result.changes === 1) {
      return Promise.resolve();
    }
  } catch (e: unknown) {
    console.warn('eeeee', e);
  }

  return Promise.reject(ApiError.insertCount);
}

/**
 * Finds matching user in DB and generates a token for the user
 * @param login string
 * @param password string
 * @returns Promise<string> Promise resolved with token or rejected with no value
 */
export async function login(login: string, password: string): Promise<string> {
  const result = getStatement('SELECT * FROM users WHERE login = ? AND password = ?').get(login, getHash(password));
  
  if (result === undefined || result.count === 0) {
    return Promise.reject();
  }

  const token = generateToken();
  getStatement('UPDATE users SET token = ? WHERE id = ?').run(token, result.id);
  await setCookie(TOKEN_COOKIE_NAME, token);

  return Promise.resolve(token);
}

/**
 * Attempts to retrieve auth token from cookies
 * @returns Promise<string> Resolves with token value if found, rejects with 'token' word otherwise 
 */
export async function getToken(): Promise<string> {
  const token = await getCookie(TOKEN_COOKIE_NAME);

  if (token) {
    return Promise.resolve(token);
  } else {
    return Promise.reject(ApiError.badToken);
  }
}

/**
 * Reads the token from request cookies and check it in DB
 * @returns Promise<boolan> - true if token is assigned to user, false otherwise
 */
export async function checkToken(): Promise<boolean> {
  return getToken()
    .then((token) => {
      const result = getStatement('SELECT COUNT(*) AS count FROM users WHERE token = ?').get(token);  
      return Promise.resolve(result !== undefined && result.count == 1);
    })
    .catch(() => Promise.resolve(false));
}

/**
 * Removes token from request and from DB if possible
 * @returns Promise<void>
 */
export async function removeToken(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

  if (token === undefined) return;

  cookieStore.delete(TOKEN_COOKIE_NAME);

  getStatement(`
    UPDATE users 
    SET token = null 
    WHERE token = ?
  `).run(token);
}
