'use client'

import Link from 'next/link';
import { useEffect } from 'react';

import { Routes } from '@/types';
import { removeToken } from '@/utils/auth';

export default function Logout() {
  useEffect(() => {
    removeToken();
  }, []);

  return (
    <>
      <h1>
        <Link href={Routes.home}>&larr;</Link>
        <span>Logout</span>
      </h1>
    </>
  );
}