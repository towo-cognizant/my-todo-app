import { Item, Items } from '@/types';

import TaskItem from '../TaskItem';

import './TaskList.scss';

interface Props {
    items: Items,
    deleteItem: (id: number) => void,
    doneItem: (id: number) => void,
    editItem: (id: number) => void,
}

export default function TaskList(props: Props) {

    const { items, deleteItem, doneItem, editItem } = props;

    return <div className="TaskList">
        {
            items !== undefined ? items.map((item: Item) => (
                <TaskItem key={item.id} item={item} deleteItem={deleteItem} doneItem={doneItem} editItem={editItem} />
            )) : (
                <h3>
                    Please wait&hellip;
                </h3>
            )
        }
    </div>;
}
