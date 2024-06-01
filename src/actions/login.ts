'use server';

import { redirect } from 'next/navigation';

import { sleep } from '@/lib/utils';

export async function signIn(formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  await sleep(1000);
  redirect('/dashboard');
}

export async function signOut() {
  redirect('/sign-in');
}
