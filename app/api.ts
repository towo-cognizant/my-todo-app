const MAX_TIMEOUT = 2000;

const LOCAL_STORAGE_KEY = 'todo';

function getRandomTimeout(): number {
  return Math.round(MAX_TIMEOUT * Math.random());
}

export async function read() {
  return new Promise<Items>((resolve, reject) => {
    setTimeout(() => {
      const data: null | string = localStorage.getItem(LOCAL_STORAGE_KEY);

      resolve(
        data === null ? [] : JSON.parse(data)
      );
    }, getRandomTimeout())
  });
}

export async function write(items: Items) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
      resolve();
    }, getRandomTimeout());
  });
}