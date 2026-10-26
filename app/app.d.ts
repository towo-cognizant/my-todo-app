interface Item {
    id: number,
    text: string,
    done: boolean,
}

type Items = Item[];

type OptionalItem = Item | undefined;