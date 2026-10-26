'use client';

import { useState } from 'react';

import TaskList from './components/TaskList/TaskList';
import Form from './components/Form/Form';

import './app.scss';

export default function App() {
    const [ items, setItems ]: [ Items, (item: Items) => void] = useState<Items>([]);

    const [ editable, setEditable ]: [ OptionalItem, (item: OptionalItem) => void] = useState<OptionalItem>();

    function saveItem(text: string): void {
        console.log(editable, text);

        if (editable) {
            const updatedItems = items.map((item: Item) => {
                if (item.id !== editable.id) {
                    return item;
                } else {
                    return { ...editable, text, done: false };
                }
            });

            setItems(updatedItems);

            setEditable(undefined);
        } else {
            const item: Item = {
                id: (new Date()).getTime(),
                text,
                done: false,
            }

            setItems([...items, item]);
        }
    }

    function deleteItem(id: number): void {
        setItems(
            items.filter((item) => item.id !== id)
        );
    }

    function doneItem(id: number): void {
        setItems(
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
            <h1>TODO</h1>
            <TaskList items={items} deleteItem={deleteItem} doneItem={doneItem} editItem={editItem} />
            <Form saveItem={saveItem} editable={editable} cancelEdit={cancelEdit} />
        </div>
    );
}
