import { PlusCircle } from 'lucide-react';
import Image from 'next/image';

import HeartButton from '@/components/heart-button/heart-button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { SVGSkeleton, Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export interface Album {
  id: string;
  liked: boolean;
  name: string;
  artist: string;
  cover: string;
}

export interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album;
  aspectRatio?: 'portrait' | 'square';
  width?: number;
  height?: number;
}

export function AlbumArtwork({ album, aspectRatio = 'portrait', width, height, className, ...props }: AlbumArtworkProps) {
  return (
    <div className={cn('space-y-3 group', className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md drop-shadow-md">
            <Image
              src={album.cover}
              alt={album.name}
              width={width}
              height={height}
              className={cn(
                'object-cover transition-all group-hover:scale-105 select-none',
                aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
              )}
            />
            <HeartButton id={album.id} isLiked={album.liked} />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="mr-2 h-4 w-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
                </svg>
                Liked Songs
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuItem>Create Station</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium line-clamp-1 capitalize">{album.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-3">{album.artist[0].toUpperCase() + album.artist.slice(1)}</p>
      </div>
    </div>
  );
}

export function AlbumArtworkSkeleton({ className, aspectRatio = 'portrait' }: Partial<AlbumArtworkProps>) {
  return (
    <div className="space-y-3">
      <span>
        <div>
          <SVGSkeleton
            className={cn(
              'object-cover transition-all hover:scale-105',
              aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
              className,
            )}
          />
        </div>
      </span>
      <div className="space-y-1">
        <h3 className="leading-none">
          <Skeleton className="w-[200px] max-w-full" />
        </h3>
        <p>
          <Skeleton className="text-xs w-[160px] max-w-full" />
          <Skeleton className="text-xs w-[180px] max-w-full" />
          <Skeleton className="text-xs w-[130px] max-w-full" />
        </p>
      </div>
    </div>
  );
}
