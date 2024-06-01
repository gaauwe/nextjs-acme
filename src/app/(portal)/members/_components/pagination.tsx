'use client';

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DataTablePaginationProps {
  children?: React.ReactNode;
}

export function DataTablePagination({ children }: DataTablePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageSize = searchParams.get('pageSize') ?? '10';
  const pageIndex = searchParams.get('page') ?? '1';

  const setSearchParams = (items: { key: string; value: string }[]) => {
    const params = new URLSearchParams(searchParams.toString());
    items.forEach((item) => params.set(item.key, item.value));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between pl-2 py-4">
      {children}
      <div className="flex items-center space-x-6 lg:space-x-8 ml-auto">
        <div className="items-center space-x-2 hidden lg:flex">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            defaultValue={pageSize}
            onValueChange={(value) => {
              setSearchParams([
                { key: 'pageSize', value },
                { key: 'page', value: '1' },
              ]);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {pageTotal ? `Page ${pageIndex} of ${pageTotal}` : null}
        </div> */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setSearchParams([{ key: 'page', value: '1' }])}
            disabled={pageIndex === '1'}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setSearchParams([{ key: 'page', value: `${Number(pageIndex) - 1}` }])}
            disabled={pageIndex === '1'}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setSearchParams([{ key: 'page', value: `${Number(pageIndex) + 1}` }])}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => setSearchParams([{ key: 'page', value: '999' }])}>
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function DataTablePaginationSkeleton() {
  return (
    <div className="flex items-center justify-between pl-2 py-4">
      <div className="flex items-center space-x-6 lg:space-x-8 ml-auto">
        <div className="items-center space-x-2 hidden lg:flex">
          <p className="text-sm font-medium">Rows per page</p>
          <Select>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={10} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">Page 1 of 10</div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex">
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex">
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
