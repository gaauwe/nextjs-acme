import { Separator } from '@/components/ui/separator';

import DataTableWithSuspense from './_components/data-table';

export default async function Browse({ searchParams }: { searchParams: Record<string, string> }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
          <p className="text-sm text-muted-foreground">Who doesn&lsquo;t love a nice table.</p>
        </div>
      </div>
      <Separator className="my-4" />
      <DataTableWithSuspense path="/products" />
    </>
  );
}
