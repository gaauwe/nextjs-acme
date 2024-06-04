import { Suspense } from 'react';

import { getUrl } from '@/lib/utils';

import { DataTable, DataTableProps, DataTableSkeleton } from './data-table';

export default function DataTableWithSuspense(props: DataTableProps) {
  return (
    <Suspense key={props.path} fallback={<DataTableSkeleton {...props} />}>
      <DataTableLoader {...props} />
    </Suspense>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DataTableLoader(props: any) {
  let data = {};
  try {
    data = await fetch(getUrl(`/api${props.path}`), { cache: 'force-cache' }).then((res) => res.json());
  } catch (e) {
    console.error(e);
  }

  return <DataTable {...props} data={data} />;
}
