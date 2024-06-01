import { PlusCircle, Podcast } from 'lucide-react';

import AlbumScrollArea from '@/components/album-scroll-area/album-scroll-area';
import { EmptyStatePlaceholder } from '@/components/empty-state-placeholder/empty-state-placeholder';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getListenNow, getMadeForYou } from '@/services/posts';

export default async function ListenNow() {
  return (
    <Tabs defaultValue="music" className="h-full space-y-6">
      <div className="space-between flex items-center">
        <TabsList>
          <TabsTrigger value="music" className="relative">
            Music
          </TabsTrigger>
          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
          <TabsTrigger value="live" disabled>
            Live
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto">
          <Button>
            <PlusCircle className="h-4 w-4" />
            Add music
          </Button>
        </div>
      </div>
      <TabsContent value="music" className="border-none p-0 outline-none">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Listen Now</h2>
            <p className="text-sm text-muted-foreground">Top picks for you. Updated daily.</p>
          </div>
        </div>
        <Separator className="my-4" />
        <AlbumScrollArea fetcher={getListenNow} className="w-[250px]" width={250} height={330} />
        <div className="mt-6 space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Made for You</h2>
          <p className="text-sm text-muted-foreground">Your personal playlists. Updated daily.</p>
        </div>
        <Separator className="my-4" />
        <AlbumScrollArea fetcher={getMadeForYou} aspectRatio="square" className="w-[150px]" width={150} height={150} />
      </TabsContent>
      <TabsContent value="podcasts" className="h-full flex-col border-none p-0 data-[state=active]:flex">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">New Episodes</h2>
            <p className="text-sm text-muted-foreground">Your favorite podcasts. Updated daily.</p>
          </div>
        </div>
        <Separator className="my-4" />
        <EmptyStatePlaceholder title="No episodes added" subtitle="You have not added any podcasts. Add one below." icon={Podcast}>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="relative">
                Add Podcast
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Podcast</DialogTitle>
                <DialogDescription>Copy and paste the podcast feed URL to import.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="url">Podcast URL</Label>
                  <Input id="url" placeholder="https://example.com/feed.xml" />
                </div>
              </div>
              <DialogFooter>
                <Button>Import Podcast</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </EmptyStatePlaceholder>
      </TabsContent>
    </Tabs>
  );
}
