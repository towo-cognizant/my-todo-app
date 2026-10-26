'use client'

import clsx from 'clsx';
import { useState } from 'react';

import { Item } from '@/types';
import Confirm from '@/components/confirm';

import './TaskItem.scss';

interface Props {
    item: Item,
    deleteItem: (id: number) => void,
    doneItem: (id: number) => void,
    editItem: (id: number) => void,
}

export default function TaskItem(props: Props) {
    const { item, deleteItem, doneItem, editItem } = props;

    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

    function onDelete() {
        setDeleteOpen(true);
    }

    return (
        <div className="TaskItem">
            <button onClick={() => doneItem(item.id)}>{ item.done ? <>&#128505;</> : <>&#9744;</> }</button>

            <div className={clsx('label', { empty: !item.text, done: item.done })}>
                {item.text ? item.text : '(empty)'}
            </div>

            <button onClick={() => editItem(item.id)}>&#9998;</button>
            <button onClick={onDelete}>&#x1F5D1;</button>

            <Confirm
                close={() => setDeleteOpen(false)} 
                confirm={() => deleteItem(item.id)}
                isOpen={deleteOpen} 
                title="Confirm"
            > 
                <p>Are you sure?</p>
            </Confirm>
        </div>
    );
}
