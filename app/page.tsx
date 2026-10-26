'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Routes } from '@/types';
import { checkToken } from '@/utils/auth';

enum USER_STATE {
  Unknown,
  NotLoggedIn,
  LoggedIn,
}

export default function RootPage() {
  const [userState, setUserState] = useState<USER_STATE>(USER_STATE.Unknown);

  useEffect(() => {
    checkToken().then((response) => {
      setUserState(response ? USER_STATE.LoggedIn : USER_STATE.NotLoggedIn);
    });
  }, []);

  return <>
    <h1>Welcome</h1>
    <section>
      {(userState === USER_STATE.LoggedIn) && (
        <article>
          <p>Don't wait, start now, just click below and start todo-ing&hellip;</p>
          <footer>
            <Link href={Routes.todo}>todo</Link>
          </footer>
        </article>
      )}

      {(userState === USER_STATE.NotLoggedIn) && (
        <article>
          <p>Before you do a TO DO, do the login&hellip;</p>
          <footer>
            <Link href={Routes.login}>login</Link>
          </footer>
        </article>
      )}
    </section>
  </>
}