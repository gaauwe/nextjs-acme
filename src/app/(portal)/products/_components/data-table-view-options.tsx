'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { DataTableProps } from './data-table';

interface DataTableViewOptionsProps {
  columns?: DataTableProps['columns'];
}

export function DataTableViewOptions({ columns }: DataTableViewOptionsProps) {
  const searchParams = useSearchParams();
  const activeColumns = searchParams.get('columns')?.split(',') ?? [];

  const updateSearchParams = (value: string | number) => {
    let currColumns = activeColumns.length === 0 ? columns?.map((column) => column.viewHeader ?? column.header) ?? [] : activeColumns;
    if (currColumns.includes(value.toString())) {
      currColumns = currColumns.filter((column) => column !== value.toString());
    } else {
      currColumns.push(value.toString());
    }

    const params = new URLSearchParams(searchParams);

    if (currColumns.length === columns?.length) {
      params.delete('columns');
    } else {
      params.set('columns', currColumns.join(','));
    }

    window.history.pushState(null, '', `?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto hidden h-8 md:flex">
          <MixerHorizontalIcon className="h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns?.map((column) => {
          const value = column.viewHeader ?? column.header;
          return (
            <DropdownMenuCheckboxItem
              key={column.header}
              className="capitalize"
              checked={activeColumns.length === 0 || activeColumns.includes(value)}
              onCheckedChange={() => updateSearchParams(value)}
            >
              {value}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
