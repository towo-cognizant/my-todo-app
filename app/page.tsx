'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

import TaskList from './components/TaskList/TaskList';
import Form from './components/Form/Form';

import { read, write } from './api';

import './app.scss';

export default function App() {
    const [ loading, setLoading ]: [ boolean, (loading: boolean) => void ] = useState<boolean>(false);
    const [ items, setLocalItems ]: [ Items, (item: Items) => void ] = useState<Items>([]);
    const [ editable, setEditable ]: [ OptionalItem, (item: OptionalItem) => void ] = useState<OptionalItem>();

    function reload() {
        setLoading(true);

        read().then(
            (data: Items) => {
                setLocalItems(data);
                setLoading(false);
            }
        );
    }

    useEffect(() => {
        reload();
    }, []);

    function setItems(items: Items): Promise<void> {
        setLoading(true);
        setLocalItems(items);

        return write(items).then(() => {
            setLoading(false);
        });
    }

    function saveItem(text: string): Promise<void> {
        if (editable) {
            const updatedItems = items.map((item: Item) => {
                if (item.id !== editable.id) {
                    return item;
                } else {
                    return { ...editable, text, done: false };
                }
            });

            setEditable(undefined);
            return setItems(updatedItems);
        } else {
            const item: Item = {
                id: (new Date()).getTime(),
                text,
                done: false,
            }

            return setItems([...items, item]);
        }
    }

    function deleteItem(id: number): Promise<void> {
        return setItems(
            items.filter((item) => item.id !== id)
        );
    }

    function doneItem(id: number): Promise<void> {
        return setItems(
            items.map((item) => {
                if (item.id !== id) {
                    return item;
                } else {
                    return { ...item, done: !item.done };
                }
            })
        );
    }

    function editItem(id: number): void {
        setEditable(
            items.find((item: Item) => item.id === id)
        );
    }

    function cancelEdit(): void {
        setEditable(undefined);
    }

    return (
        <div id="app">
            <h1 className={clsx('title', {loading: loading})}>TODO</h1>
            <TaskList items={items} deleteItem={deleteItem} doneItem={doneItem} editItem={editItem} />
            <Form saveItem={saveItem} editable={editable} cancelEdit={cancelEdit} reload={reload} />
        </div>
    );
}
