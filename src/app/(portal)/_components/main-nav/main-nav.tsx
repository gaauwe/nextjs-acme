'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const path = usePathname();

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
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
  );
}
