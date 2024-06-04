import { Separator } from '@/components/ui/separator';

import DataTableWithSuspense from './_components/data-table';

export default async function Products() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold tracking-tight">Products</h2>
          <p className="text-sm text-muted-foreground">Who doesn&lsquo;t love a nice table.</p>
        </div>
      </div>
      <Separator className="my-4" />
      <DataTableWithSuspense
        path="/products"
        columns={[
          { header: '', viewHeader: 'Image', cell: 'image', type: 'image', width: '100px' },
          { header: 'Name', cell: 'name' },
          { header: 'Status', cell: 'status', type: 'badge' },
          { header: 'Price', cell: 'price', type: 'currency' },
          { header: 'Total Sales', cell: 'totalSales', type: 'number' },
          { header: 'Category', cell: 'category', type: 'badge' },
        ]}
      />
    </>
  );
}
