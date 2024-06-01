'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { sleep } from '@/lib/utils';

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  cookies().set('email', email);

  await sleep(1000);
  redirect('/listen-now');
}

export async function signOut() {
  cookies().delete('email');
  redirect('/sign-in');
}
