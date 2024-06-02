'use client';

import { useState } from 'react';

import { Home, Menu, Package, Package2, Settings, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { UserNav } from '@/app/(portal)/_components/user-nav/user-nav';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export default function MobileNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="flex h-14 items-center gap-4 bg-sidebar px-4 py-5 pb-3 lg:hidden lg:h-[60px] lg:px-6">
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
        <SheetContent side="left" className="bg-sidebar border-0">
          <nav className="grid gap-2 text-lg font-medium">
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold mb-2">
              <Package2 className="h-6 w-6 text-primary" />
              <span className="text-primary px-1">Acme Inc</span>
            </Link>
            <Link
              href="/dashboard"
              className={cn('mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  text-white/60 hover:text-white', {
                'bg-muted text-foreground hover:text-foreground': path.startsWith('/dashboard'),
              })}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/products"
              className={cn('mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  text-white/60 hover:text-white', {
                'bg-muted text-foreground hover:text-foreground': path.startsWith('/products'),
              })}
            >
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              href="/customers"
              className={cn('mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  text-white/60 hover:text-white', {
                'bg-muted text-foreground hover:text-foreground': path.startsWith('/customers'),
              })}
            >
              <Users className="h-5 w-5" />
              Customers
            </Link>
            <Link
              href="/settings"
              className={cn('mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  text-white/60 hover:text-white', {
                'bg-muted text-foreground hover:text-foreground': path.startsWith('/settings'),
              })}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <a className="flex items-center gap-2 font-semibold text-white mx-auto" href="/">
        Acme Inc
      </a>
      <UserNav user={{ email: 'john.doe@acme.com' }} sideOffset={8} alignOffset={-12} align="end" />
    </header>
  );
}
