'use server';

import { redirect } from 'next/navigation';

import { sleep } from '@/lib/utils';

export async function signIn() {
  await sleep(1000);
  redirect('/dashboard');
}

export async function signOut() {
  redirect('/sign-in');
}
