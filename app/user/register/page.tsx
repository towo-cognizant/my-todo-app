'use client'

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';

import Notification from '@/components/notification';
import { ApiError, Routes } from '@/types';
import { register } from '@/utils/auth';

enum RegistrationError {
  none,
  passwordMismatch,
  duplicateLogin,
  unknown,
}

export default function LoginPage() {
  const [error, setError] = useState<RegistrationError>(RegistrationError.none);
  
  async function onSubmit(data: FormData) {
    setError(RegistrationError.none);

    const user = data.get('login') as string;
    const password1 = data.get('password1') as string;
    const password2 = data.get('password2') as string;

    if (password1 !== password2) {
      setError(RegistrationError.passwordMismatch);
      return;
    }

    register(user, password1)
      .catch((e: unknown) => {
        
        if (e instanceof Error) {
          if (e.message as ApiError === ApiError.insertCount) {
            return setError(RegistrationError.duplicateLogin);
          }
        }

        setError(RegistrationError.unknown);
      })
      .then(() => {
        redirect(Routes.login);
      });
  }

  return (
    <>
      <h1>
        <Link href={Routes.home}>&larr;</Link>
        {" "}
        Register
      </h1>

      <form action={onSubmit}>
        {(error === RegistrationError.passwordMismatch) && (
          <Notification type={Notification.Type.error}>Passwords need to be equal</Notification>
        )}

        {(error === RegistrationError.duplicateLogin) && (
          <Notification type={Notification.Type.error}>Login already used</Notification>
        )}

        {(error === RegistrationError.unknown) && (
          <Notification type={Notification.Type.error}>Something went wrong</Notification>
        )}

        <input type="text" name="login" placeholder="login" required />

        <input type="password" name="password1" placeholder="new password" required  />
        <input type="password" name="password2" placeholder="repeat password" required  />

        <footer>
          <input type="submit" value="register" />
        </footer>
      </form>
    </>
  );
}