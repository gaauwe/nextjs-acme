'use client';
import { Package2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { UserNav } from '@/app/(portal)/_components/user-nav/user-nav';
import { cn } from '@/lib/utils';

export function MainNav() {
  const path = usePathname();

  return (
    <div className="items-center px-4 hidden lg:flex lg:pt-5 lg:pb-2">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Package2 className="h-6 w-6 text-primary" />
        <span className="text-primary">Acme Inc</span>
      </Link>
      <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
        <Link
          href="/dashboard"
          className={cn('text-sm font-medium text-white/60 transition-colors hover:text-white', {
            'text-white': path.startsWith('/dashboard'),
          })}
        >
          Dashboard
        </Link>
        <Link
          href="/customers"
          className={cn('text-sm font-medium text-white/60 transition-colors hover:text-white', {
            'text-white': path.startsWith('/customers'),
          })}
        >
          Customers
        </Link>
        <Link
          href="/products"
          className={cn('text-sm font-medium text-white/60 transition-colors hover:text-white', {
            'text-white': path.startsWith('/products'),
          })}
        >
          Products
        </Link>
        <Link
          href="/settings"
          className={cn('text-sm font-medium text-white/60 transition-colors hover:text-white', {
            'text-white': path.startsWith('/settings'),
          })}
        >
          Settings
        </Link>
      </nav>
      <div className="ml-auto flex items-center space-x-4">
        <UserNav user={{ email: 'john.doe@acme.com' }} />
      </div>
    </div>
  );
}
