import { Suspense } from 'react';

import { Album, AlbumArtwork, AlbumArtworkProps, AlbumArtworkSkeleton } from '@/components/album-artwork/album-artwork';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface AlbumScrollAreaProps extends Partial<AlbumArtworkProps> {
  fetcher: () => Promise<Album[]>;
}

export default async function AlbumScrollArea({ fetcher, ...props }: AlbumScrollAreaProps) {
  return (
    <ScrollArea>
      <div className="flex gap-x-4 pb-4">
        <Suspense fallback={<LoadingSkeleton {...props} />}>
          <Albums fetcher={fetcher} {...props} />
        </Suspense>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export async function Albums({ fetcher, ...props }: AlbumScrollAreaProps) {
  const listenNowAlbums = await fetcher();

  return listenNowAlbums.map((album) => <AlbumArtwork key={album.id} album={album} {...props} />);
}

export function LoadingSkeleton({ length, ...props }: Partial<AlbumArtworkProps> & { length?: number }) {
  return Array.from({ length: length ?? 10 }).map((_, index) => <AlbumArtworkSkeleton key={index} {...props} />);
}
