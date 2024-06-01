import { Separator } from '@/components/ui/separator';
import { getTasks } from '@/services/tasks/tasks';

import Table from './_components/table';

export default async function Browse({ searchParams }: { searchParams: Record<string, string> }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Members</h2>
          <p className="text-sm text-muted-foreground">Everyone in your organization.</p>
        </div>
      </div>
      <Separator className="my-4" />
      <Table key={new URLSearchParams(searchParams).toString()} fetcher={getTasks} />
    </>
  );
}
