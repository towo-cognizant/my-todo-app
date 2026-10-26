import { cookies } from 'next/headers';
import { createHash } from 'node:crypto';
import db, { StatementSync } from 'node:sqlite';

import { ApiError } from '@/types';

/**
 * Get SQLite statement
 * 
 * @param sql SQL query
 * @returns StatementSync
 */
export function getStatement(sql: string): StatementSync {
  return new db
    .DatabaseSync('./lorem-ipsum.sqlite', { enableForeignKeyConstraints: true })
    .prepare(sql);
}

/**
 * Gets cookie value assigned to given cookie name
 * @param name cookie name
 * @returns Promise<string> async cookie value
 */
export async function getCookie(name: string) {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

/**
 * Sets cookie value for given cookie name
 * @param name cookie name
 * @param value cookie value;
 */
export async function setCookie(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value);
}

/**
 * Generates a hash from given string
 * @param value input string
 * @returns string with hash
 */
export function getHash(value: string): string {
  return createHash('MD5').update(value).digest('hex');
}

/**
 * Generates a new random token
 * @returns string with token
 */
export function generateToken(): string {
  return getHash(Math.random().toString());
}

export function getApiErrorFromError(e: Error | string) {
  if (e instanceof Error) return e.message as ApiError;
  if (typeof e === 'string') return e.replace(/^Error:\s*/, '');
}