import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Routes } from '@/types';
import { checkToken } from '@/utils/auth';

export const metadata: Metadata = {
  title: 'Register',
};

export default async function LoginLayout({ children }: LayoutProps<"/">) {
  if (await checkToken()) {
    redirect(Routes.todo);
  }
  
  return (
    <>
      {children}
    </>
  );
}
