import { sleep } from '@/lib/utils';

export async function getListenNow() {
  await sleep(1000);
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'force-cache' }).then((res) => res.json());

  return posts.slice(0, 10).map((post: Record<string, string>) => ({
    id: post.id,
    name: post.title,
    artist: post.body,
    cover: `https://picsum.photos/seed/${post.id}listen-now/1000/1000`,
    liked: false,
  }));
}

export async function getMadeForYou() {
  await sleep(1000);
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'force-cache' }).then((res) => res.json());

  return posts.slice(0, 10).map((post: Record<string, string>) => ({
    id: post.id,
    name: post.title,
    artist: post.body,
    cover: `https://picsum.photos/seed/${post.id}made-for-you/1000/1000`,
    liked: false,
  }));
}
