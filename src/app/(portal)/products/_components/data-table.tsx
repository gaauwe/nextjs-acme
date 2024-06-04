'use client';

import { useDeferredValue, useEffect, useRef, useState } from 'react';

import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { Badge, BadgeProps } from '@/components/ui/badge';
import { SVGSkeleton, Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';

export interface TData<T> {
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
      options: { label: string; value: string; badgeColor?: string }[];
    }[];
  };
}

export interface DataTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  path: string;
  filterPlaceholder?: string;
  columns: {
    header: string;
    viewHeader?: string;
    cell: string;
    width?: string;
    type?: 'badge' | 'image' | 'date' | 'currency' | 'number';
    canSort?: boolean;
  }[];
}

export function DataTable({ columns, filterPlaceholder, data }: DataTableProps) {
  const searchParams = useSearchParams();
  const deferedSearchParams = useDeferredValue(searchParams);
  const loadingTimeout = useRef<NodeJS.Timeout>();
  const activeColumns = searchParams.get('columns')?.split(',') ?? [];

  const [isLoading, setIsLoading] = useState(false);

  // const { data } = useSuspenseQuery<TData<Record<string, string | number>[]>>({
  //   queryKey: [path, deferedSearchParams.toString().replace(/&?columns=[^&]*/g, '')],
  //   queryFn: async () => {
  //     const data = await fetch(getUrl(`/api${path}?${searchParams.toString()}`), { cache: 'force-cache' }).then((res) => res.json());
  //     return data;
  //   },
  // });

  useEffect(() => {
    if (searchParams.toString() !== deferedSearchParams.toString()) {
      loadingTimeout.current = setTimeout(() => setIsLoading(true), 50);
    }

    if (loadingTimeout.current && searchParams.toString() === deferedSearchParams.toString()) {
      clearTimeout(loadingTimeout.current);
      setIsLoading(false);
    }
  }, [searchParams, deferedSearchParams]);

  return (
    <div className="space-y-4">
      <DataTableToolbar
        filters={data.meta.filters}
        search={searchParams.get('search')}
        placeholder={filterPlaceholder}
        searchParams={searchParams}
        columns={columns}
      />
      <div className="rounded-md border bg-white relative">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((header, i) => {
                if (activeColumns.length > 0 && !activeColumns.includes(header.viewHeader ?? header.header)) {
                  return null;
                }

                return (
                  <TableHead key={i} className="text-nowrap">
                    <DataTableColumnHeader column={header} />
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.length ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data.data.map((row: any) => (
                <TableRow key={row.id} data-state="nselected" className="cursor-pointer">
                  {columns.map((column, i) => {
                    if (activeColumns.length > 0 && !activeColumns.includes(column.viewHeader ?? column.header)) {
                      return null;
                    }

                    const value = row[column.cell];

                    if (column.type === 'date') {
                      return (
                        <TableCell key={i} width={column.width} style={{ minWidth: column.width }} className="text-nowrap">
                          {new Date(value).toLocaleDateString('nl-NL', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })}
                        </TableCell>
                      );
                    }

                    if (column.type === 'currency') {
                      return (
                        <TableCell key={i} width={column.width} style={{ minWidth: column.width }} className="text-nowrap">
                          {new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(Number(value))}
                        </TableCell>
                      );
                    }

                    if (column.type === 'number') {
                      return (
                        <TableCell key={i} width={column.width} style={{ minWidth: column.width }} className="text-nowrap">
                          {new Intl.NumberFormat('nl-NL').format(Number(value))}
                        </TableCell>
                      );
                    }

                    if (column.type === 'image' && typeof value === 'string') {
                      return (
                        <TableCell key={i} width={column.width} style={{ minWidth: column.width }}>
                          <Image src={value} alt="" width={64} height={64} className="h-16 w-16 rounded-md shadow-md" />
                        </TableCell>
                      );
                    }

                    if (column.type === 'badge') {
                      const option = data.meta.filters
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        .find((filter: any) => filter.key === column.cell)
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        ?.options.find((option: any) => option.value === value);
                      const badgeVariant = option?.badgeColor as BadgeProps['variant'];

                      return (
                        <TableCell key={i} width={column.width} style={{ minWidth: column.width }}>
                          <Badge variant={badgeVariant} className="text-nowrap">
                            {option?.label}
                          </Badge>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={i} style={{ minWidth: column.width, maxWidth: column.width }}>
                        {value}
                      </TableCell>
                    );
                  })}
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
        {isLoading && (
          <div className="absolute z-10 inset-0 flex justify-center items-center bg-background/80 rounded-md">
            <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </div>
      <DataTablePagination {...data.meta.page} />
    </div>
  );
}

export function DataTableSkeleton(props: DataTableProps) {
  return (
    <div className="space-y-4">
      <DataTableToolbar filters={[]} placeholder={props.filterPlaceholder} columns={props.columns} />
      <div className="rounded-md border bg-white relative">
        <Table>
          <TableHeader>
            <TableRow>
              {props.columns.map((header, i) => {
                return <TableHead key={i}>{header.header.length > 0 ? <Skeleton className="h-4 w-24" /> : null}</TableHead>;
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }, (row, i) => (
              <TableRow key={i} data-state="nselected" className="cursor-pointer">
                {props.columns.map((column, i) => {
                  const randomWidth = Math.floor(Math.random() * (200 - 120 + 1)) + 120;

                  if (column.type === 'image') {
                    return (
                      <TableCell key={i} width={column.width}>
                        <SVGSkeleton className="h-16 w-16 rounded-md shadow-md" />
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={i} width={column.width} className="h-[55px]">
                      <Skeleton className="h-4" style={{ width: randomWidth }} />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
