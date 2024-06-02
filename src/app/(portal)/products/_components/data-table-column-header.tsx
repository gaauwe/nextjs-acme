import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { DataTableProps } from './data-table';

interface DataTableColumnHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  column: DataTableProps['columns'][number];
}

export function DataTableColumnHeader({ column, className }: DataTableColumnHeaderProps) {
  const searchParams = useSearchParams();
  const sort = searchParams.get(`sort[${column.cell}]`);

  if (column.canSort === false || !column.header) {
    return <div className={cn(className)}>{column.header}</div>;
  }

  const toggleSorting = (isDesc: boolean) => {
    const params = new URLSearchParams(searchParams);
    [...params.keys()].forEach((key) => {
      if (key.startsWith('sort[')) {
        params.delete(key);
      }
    });

    params.set(`sort[${column.cell}]`, isDesc ? 'desc' : 'asc');
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span>{column.header}</span>
            {sort === 'desc' ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : sort === 'asc' ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
