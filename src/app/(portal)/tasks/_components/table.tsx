import { Suspense } from 'react';

import { LoaderCircle } from 'lucide-react';

import { DataTable } from './data-table';

export interface TableProps {
  fetcher: () => Promise<Record<string, string>[]>;
}

export default function Table({ fetcher }: TableProps) {
  return (
    <Suspense
      fallback={
        <div className="h-full w-full flex flex-1 items-center justify-center">
          <LoaderCircle className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <DataTableWrapper fetcher={fetcher} />
    </Suspense>
  );
}

async function DataTableWrapper({ fetcher }: TableProps) {
  const data = await fetcher();

  return <DataTable data={data} />;
}
