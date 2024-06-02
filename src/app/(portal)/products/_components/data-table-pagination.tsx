import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { TData } from './data-table';

export function DataTablePagination({ currentPage, lastPage, total }: TData<unknown>['meta']['page']) {
  const searchParams = useSearchParams();

  const updateSearchParams = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value.toString());
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between px-2 flex-wrap gap-2">
      <div className="flex-1 text-sm text-muted-foreground text-nowrap">0 of {total} row(s) selected.</div>
      <div className="flex items-center gap-x-6 lg:gap-x-8">
        <div className="items-center gap-x-2 hidden md:flex">
          <p className="text-sm font-medium">Rows per page</p>
          <Select value={searchParams.get('page[size]') ?? ''} onValueChange={(value) => updateSearchParams('page[size]', value)}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder="10" />
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
        <div className="flex items-center justify-center text-sm font-medium">
          Page {currentPage} of {lastPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={currentPage === 1}
            onClick={() => updateSearchParams('page', '1')}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={currentPage === 1}
            onClick={() => updateSearchParams('page', currentPage - 1)}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={currentPage === lastPage}
            onClick={() => updateSearchParams('page', currentPage + 1)}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={currentPage === lastPage}
            onClick={() => updateSearchParams('page', lastPage)}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
