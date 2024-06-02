import { PlusCircledIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

interface DataTableFacetedFilterProps {
  label: string;
  filterKey: string;
  options: {
    label: string;
    value: string;
  }[];
}

export function DataTableFacetedFilter({ label, filterKey, options }: DataTableFacetedFilterProps) {
  const key = `filter[${filterKey}]`;
  const searchParams = useSearchParams();
  const selectedValues = searchParams.getAll(key);

  // GET /comments?filter[post]=1 HTTP/1.1
  const updateSearchParams = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value === null) {
      params.delete(key);
    } else {
      if (selectedValues.includes(value)) {
        params.delete(key);
        const oldValues = selectedValues.filter((v) => v !== value);
        if (oldValues.length > 0) {
          oldValues.forEach((v) => params.append(key, v));
        }
      } else {
        params.append(key, value);
      }
    }
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="h-4 w-4" />
          {label}
          {selectedValues.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.length > 2 ? (
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                    {selectedValues.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.find((value) => value === option.value))
                    .map((option) => (
                      <Badge variant="secondary" key={option.value} className="rounded-sm px-1 font-normal">
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={label} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = !!selectedValues.find((value) => value === option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      updateSearchParams(option.value);
                    }}
                  >
                    <Checkbox checked={isSelected} className="mr-2" />
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={() => updateSearchParams(null)} className="justify-center text-center">
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
