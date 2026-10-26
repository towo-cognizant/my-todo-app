import clsx from 'clsx';

import './TaskItem.scss';

interface Props {
    item: Item,
    deleteItem: (id: number) => void,
    doneItem: (id: number) => void,
    editItem: (id: number) => void,
}

export default function TaskItem(props: Props) {
    const { item, deleteItem, doneItem, editItem } = props;

    return (
        <div className="TaskItem">
            <div className={clsx('label', { empty: !item.text, done: item.done })}>
                {item.text ? item.text : '(empty)'}
            </div>

            <button onClick={() => doneItem(item.id)}>{ item.done ? <>&#9744;</> : <>&#128505;</> }</button>
            <button onClick={() => editItem(item.id)}>&#9998;</button>
            <button onClick={() => deleteItem(item.id)}>&#x1F5D1;</button>
        </div>
    );
}
