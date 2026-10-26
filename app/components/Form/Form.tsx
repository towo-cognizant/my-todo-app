'use client';

import { ChangeEvent, SubmitEvent, useEffect, useRef, useState } from 'react';

import './Form.scss';

interface Props {
    saveItem: (text: string) => void,
    cancelEdit: () => void,
    editable: OptionalItem,
};

export default function Form(props: Props) {
    const { saveItem, cancelEdit, editable } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const [ value, setValue ] = useState('');

    function onKeyPress(event: KeyboardEvent) {
        console.log('event', event);

        if (event.key === 'Escape') {
            cancelEdit();
        }
    }

    useEffect(() => {
        setValue(editable === undefined ? '' : editable.text);

        if (editable) {
            inputRef.current?.focus();

            document.addEventListener('keydown', onKeyPress);

            return () => document.removeEventListener('keydown', onKeyPress);
        }
    }, [editable]);

    function onValueChange(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    function onFormSubmit(event: SubmitEvent<HTMLFormElement>) {
        saveItem(value);
        setValue('');

        event.preventDefault();
    }

    return (
        <form className="Form" onSubmit={onFormSubmit}>
            <input
                ref={inputRef}
                type="text"
                name="text"
                placeholder="Task&hellip;"
                value={value}
                onChange={onValueChange}
                autoComplete="off"
            />

            {editable ? <input type="button" value="&#128473;" onClick={cancelEdit} /> : ''}
            <input type="submit" value={ editable ? '\u27A4' : '+' } disabled={!value}/>
        </form>
    );
}
