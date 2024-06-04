import DataTableWithSuspense from '@/app/(portal)/products/_components/data-table';
import { Separator } from '@/components/ui/separator';

export default async function Products() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold tracking-tight">Customers</h2>
          <p className="text-sm text-muted-foreground">Book of friends, but different.</p>
        </div>
      </div>
      <Separator className="my-4" />
      <DataTableWithSuspense
        path="/customers"
        filterPlaceholder="Filter customers..."
        columns={[
          { header: 'Name', cell: 'name' },
          { header: 'Email', cell: 'email' },
          { header: 'Phone', cell: 'phone' },
          { header: 'Role', cell: 'role', type: 'badge' },
          { header: 'Created At', cell: 'createdAt', type: 'date' },
        ]}
      />
    </>
  );
}
