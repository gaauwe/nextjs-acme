'use server';
import { vercelStegaEncode } from '@vercel/stega';
import { cookies } from 'next/headers';

import { getLikedIds } from '@/services/posts';

export async function addLikedSong(id: number) {
  const likedSongs = getLikedIds();

  if (likedSongs.includes(id)) {
    likedSongs.filter((songId: number) => songId !== id);
  } else {
    likedSongs.push(id);
  }

  cookies().set('liked', vercelStegaEncode({ liked: likedSongs }));
  if (id !== 1) {
    return {
      message: 'Not implemented',
    };
  }
}

export async function deleteLikedSong(id: number) {
  if (id !== 1) {
    return {
      message: 'Not implemented',
    };
  }
}
