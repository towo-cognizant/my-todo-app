export interface Item {
    id: number,
    text: string,
    done: boolean,
}

export type Items = Item[];

export type OptionalItem = Item | undefined;

export enum ApiError {
    badToken = 'bad-token',
    insertCount = 'insert-count',
    updateCount = 'update-count',
    deleteCount = 'delete-count',
}

export enum Routes {
    home = '/',
    login = '/user/login',
    logout = '/user/logout',
    register = '/user/register',
    todo = '/todo',   
}
