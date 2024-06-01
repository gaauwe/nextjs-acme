'use client';

import { useState } from 'react';

import { Menu } from 'lucide-react';

import { Sidebar } from '@/app/(portal)/_components/Sidebar/Sidebar';
import { UserNav } from '@/app/(portal)/_components/UserNav/UserNav';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-sidebar px-4 py-5 lg:hidden lg:h-[60px] lg:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="shrink-0 lg:hidden bg-[rgba(39,39,42,0.4)] hover:bg-[rgb(39,39,42)] h-10 w-10 border-[rgb(39,39,42)]"
          >
            <Menu className="h-5 w-5 text-white" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="inset-0 p-0 border-0">
          <Sidebar onClick={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
      <a className="flex items-center gap-2 font-semibold text-white mx-auto" href="/">
        Acme Inc
      </a>
      <UserNav user={{ email: 'john.doe@acme.com' }} alignOffset={-7} align="end" />
    </header>
  );
}
