import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Routes } from '@/types';
import { checkToken } from '@/utils/auth';

export const metadata: Metadata = {
  title: 'ToDo',
};

export default async function TodoLayout({ children }: LayoutProps<"/">) {
  if (!(await checkToken())) {
    return redirect(Routes.login);
  }
  
  return (
    <>
      {children}
    </>
  );
}
