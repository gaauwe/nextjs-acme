import { getListenNow } from '@/services/posts';

export default async function Dashboard() {
  const _posts = await getListenNow();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Browse</h2>
          <p className="text-sm text-muted-foreground">Funny tagline here</p>
        </div>
      </div>
    </>
  );
}
