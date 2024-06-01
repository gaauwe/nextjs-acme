import { vercelStegaDecode } from '@vercel/stega';
import { cookies } from 'next/headers';

import { sleep } from '@/lib/utils';

export function getLikedIds(): number[] {
  const cookie = cookies().get('liked');
  if (cookie) {
    return (vercelStegaDecode(cookie.value) as { liked: number[] }).liked;
  }
  return [];
}

export async function getListenNow() {
  const likedIds = getLikedIds();

  await sleep(1000);
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'force-cache' }).then((res) => res.json());

  return posts.slice(0, 10).map((post: Record<string, string>) => ({
    id: post.id,
    name: post.title,
    artist: post.body,
    cover: `https://picsum.photos/seed/${post.id}listen-now/1000/1000`,
    liked: likedIds.includes(post.id as unknown as number),
  }));
}

export async function getMadeForYou() {
  const likedIds = getLikedIds();

  await sleep(1000);
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'force-cache' }).then((res) => res.json());

  return posts.slice(10, 20).map((post: Record<string, string>) => ({
    id: post.id,
    name: post.title,
    artist: post.body,
    cover: `https://picsum.photos/seed/${post.id}listen-now/1000/1000`,
    liked: likedIds.includes(post.id as unknown as number),
  }));
}

export async function getBrowse() {
  const likedIds = getLikedIds();

  await sleep(1000);
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'force-cache' }).then((res) => res.json());

  return posts.map((post: Record<string, string>) => ({
    id: post.id,
    name: post.title,
    artist: post.body,
    cover: `https://picsum.photos/seed/${post.id}listen-now/1000/1000`,
    liked: likedIds.includes(post.id as unknown as number),
  }));
}
