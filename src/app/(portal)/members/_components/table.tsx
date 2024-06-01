import { Suspense } from 'react';

import { DataTable } from './data-table';
import { DataTableSkeleton } from './skeleton';

export interface TableProps {
  fetcher: () => Promise<Record<string, string>[]>;
}

export default function Table({ fetcher }: TableProps) {
  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <DataTableWrapper fetcher={fetcher} />
    </Suspense>
  );
}

async function DataTableWrapper({ fetcher }: TableProps) {
  const data = await fetcher();

  return <DataTable data={data} fetcher={fetcher} />;
}
