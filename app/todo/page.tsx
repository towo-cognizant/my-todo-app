'use client'

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ApiError, Item, Items, OptionalItem, Routes } from '@/types';
import { read, add, toggle, update, remove } from '@/utils/todo';

import TaskList from './components/TaskList';
import Form from './components/Form';

export default function LoginPage() {

  const [editable, setEditable] = useState<OptionalItem>();

  function logout() {
    redirect(Routes.logout);
  }

  function reload() {
    read().then(setItems);
  }

  function saveItem(text: string): Promise<void> {
    if (editable !== undefined) {
      return update(editable.id, text).then(
        () => reload(),
        (r) => console.warn(r),
      );

    } else {
      return add(text).then(
        () => reload(),
        (r) => console.warn(r),
      );
    }
  }

  function cancelEdit(): void {
    setEditable(undefined);
  }

  function doneItem(id: number): Promise<void> {
    return toggle(id).then(
      (r) => reload(),
      (r) => console.warn(r),
    );
  }

  function editItem(id: number): void {
    setEditable(
      items.find((item: Item) => item.id === id)
    );
  }

  function deleteItem(id: number): Promise<void> {
    return remove(id).then(
      () => reload(),
      (r) => console.warn(r),
    );
  }

  const [items, setItems] = useState<Items>([]);

  useEffect(() => reload, []);

  return (
    <>
      <h1>
        <Link href={Routes.home}>&larr;</Link>
        <span> TODO</span>
        <button onClick={logout}>logout</button>
      </h1>
      

      <TaskList items={items} deleteItem={deleteItem} doneItem={doneItem} editItem={editItem} />
      <Form saveItem={saveItem} editable={editable} cancelEdit={cancelEdit} reload={reload} />
    </>
  );
}