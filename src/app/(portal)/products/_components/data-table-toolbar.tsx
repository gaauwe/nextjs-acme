'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { ReadonlyURLSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps {
  filters?: { label: string; key: string; options: { label: string; value: string }[] }[];
  search?: string | null;
  placeholder?: string;
  searchParams?: ReadonlyURLSearchParams;
}

export function DataTableToolbar({ filters, search, placeholder, searchParams }: DataTableToolbarProps) {
  const isFiltered = Object.keys(searchParams ?? {}).some((key) => key.startsWith('filter') || key === 'search');

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2 flex-wrap">
        <Input
          placeholder={placeholder ?? 'Filter entries...'}
          value={search ?? ''}
          onChange={(e) => updateSearchParams('search', e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <div className="gap-x-2 flex">
          {filters?.map((filter) => <DataTableFacetedFilter key={filter.key} title={filter.label} options={filter.options} />)}
        </div>
        {isFiltered && (
          <Button variant="ghost" className="h-8 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
