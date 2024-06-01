import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { DataTablePagination } from './pagination';

export function DataTableSkeleton() {
  const columns = [1, 2, 3, 4, 5];
  return (
    <div>
      <div className="flex items-center py-4 gap-x-4">
        <Input placeholder="Search entries..." className="max-w-sm" />
        <Button variant="outline" className="ml-auto">
          Columns
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, i) => (
                <TableHead key={i} style={{ width: `${i === 0 ? 24 : i === 4 ? 36 : 150}px` }}>
                  {i < 4 ? <Skeleton className={cn('max-w-32', { 'max-w-4': i === 0 })} /> : null}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                {columns.map((column, j) => (
                  <TableCell key={j} style={{ width: `${j === 0 ? 24 : j === 4 ? 36 : 150}px` }}>
                    {j < 4 ? <Skeleton className={cn('max-w-64 min-h-8 flex items-center', { 'max-w-4': j === 0 })} /> : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination />
    </div>
  );
}
