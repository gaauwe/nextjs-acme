import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(timeout: number) {
  await new Promise((resolve) => setTimeout(resolve, timeout));
}

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://nextjs-acme-mauve.vercel.app' : 'http://localhost:4000';

const INCLUDES_FORWARD_SLASH_AT_START_REGEX = /^\/(.|\n)*$/;
const INCLUDES_FORWARD_SLASH_AT_START = (string: string) => INCLUDES_FORWARD_SLASH_AT_START_REGEX.test(string);

export const getUrl = (path: string) => `${BASE_URL}${!INCLUDES_FORWARD_SLASH_AT_START(path) ? '/' : ''}${path}`;
