'use client'

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';

import Notification from '@/components/notification';
import { Routes } from '@/types';
import { login } from '@/utils/auth';

export default function LoginPage() {
  const [error, setError] = useState(false);
  
  async function onSubmit(data: FormData) {
    setError(false);

    const user = data.get('login') as string;
    const password = data.get('password') as string;

    login(user, password)
      .catch((e: any) => setError(true));
  }

  function register() {
    redirect(Routes.register); 
  }

  return (
    <>
      <h1>
        <Link href={Routes.home}>&larr;</Link>
        {" "}
        Login
      </h1>

      <form action={onSubmit}>
        { error ? <Notification type={Notification.Type.error}>Bad login or password</Notification> : <></> }

        <input type="text" name="login" placeholder="login" required />
        <input type="password" name="password" placeholder="password" required  />

        <footer>
          <input type="submit" value="login" />
          <input type="button" value="register" onClick={register} />
        </footer>
      </form>
    </>
  );
}