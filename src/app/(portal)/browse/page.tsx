import AlbumGridArea from '@/components/album-grid-area/album-grid-area';
import { Separator } from '@/components/ui/separator';
import { getBrowse } from '@/services/posts';

export default async function Browse() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Browse</h2>
          <p className="text-sm text-muted-foreground">All your songs, in neatly in one place.</p>
        </div>
      </div>
      <Separator className="my-4" />
      <AlbumGridArea fetcher={getBrowse} aspectRatio="square" className="w-[150px]" width={150} height={150} />
    </>
  );
}
