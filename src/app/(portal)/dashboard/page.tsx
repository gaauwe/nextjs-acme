import { getPosts } from '@/services/posts';

export default async function Dashboard() {
  const posts = await getPosts();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Funny tagline here</p>
        </div>
      </div>
    </>
  );
}
