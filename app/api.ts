'use server';

const FILE_NAME = 'lorem-ipsum-dolor-sit-amet.json';

import fs from 'fs/promises';

export async function read() {
  return fs.readFile(FILE_NAME, { encoding: 'utf-8' }).then((content) => {
    return JSON.parse(content);
  }).catch((e: any) => {
    return [];
  });
}

export async function write(items: Items): Promise<void> {
  return fs.writeFile(FILE_NAME, JSON.stringify(items), { encoding: 'utf-8', flush: true, flag: 'w' });
}
