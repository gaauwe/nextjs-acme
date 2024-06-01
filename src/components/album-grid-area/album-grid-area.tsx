import { Suspense } from 'react';

import { Album, AlbumArtworkProps } from '@/components/album-artwork/album-artwork';
import { Albums, LoadingSkeleton } from '@/components/album-scroll-area/album-scroll-area';

interface AlbumGridAreaProps extends Partial<AlbumArtworkProps> {
  fetcher: () => Promise<Album[]>;
}

export default async function AlbumGridArea({ fetcher, ...props }: AlbumGridAreaProps) {
  return (
    <div className="flex gap-x-4 pb-4 flex-wrap gap-4">
      <Suspense fallback={<LoadingSkeleton length={30} {...props} />}>
        <Albums fetcher={fetcher} {...props} />
      </Suspense>
    </div>
  );
}
