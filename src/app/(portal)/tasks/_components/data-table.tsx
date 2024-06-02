'use client';

import { Suspense } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface TData<T> {
  data: T;
  meta: {
    page: {
      currentPage: number;
      perPage: number;
      lastPage: number;
      total: number;
    };
    filters: {
      label: string;
      key: string;
      options: { label: string; value: string }[];
    }[];
  };
}

export interface DataTableProps<T> {
  path: string;
}

export function DataTable<TData>({ path }: DataTableProps<TData>) {
  const searchParams = useSearchParams();
  const { data } = useSuspenseQuery({
    queryKey: ['wait', searchParams.toString()],
    queryFn: async () => {
      const data = await fetch(`http://localhost:4000/api${path}?${searchParams.toString()}`, { cache: 'force-cache' }).then((res) =>
        res.json(),
      );
      return data;
    },
  });

  const currentPage = data.meta.page.currentPage;

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => updateSearchParams('page', currentPage + 1)}>Refetch</Button>
      {/* <DataTableToolbar table={table} /> */}
      {/* <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} /> */}
    </div>
  );
}

export default function DataTableWithSuspense<T>({ path }: DataTableProps<T>) {
  const searchParams = useSearchParams();

  return (
    <Suspense
      key={searchParams.toString()}
      fallback={
        <div className="h-full w-full flex flex-1 items-center justify-center">
          <LoaderCircle className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <DataTable path={path} />
    </Suspense>
  );
}
