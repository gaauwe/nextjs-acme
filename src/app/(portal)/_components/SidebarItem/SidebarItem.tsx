'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  url: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function SidebarItem({ url, onClick, children }: SidebarItemProps) {
  const path = usePathname();
  return (
    <Button
      as={Link}
      href={url}
      onClick={onClick}
      variant="ghost"
      className={cn('w-full justify-start text-sidebar-foreground/70', {
        'bg-accent text-accent-foreground': path.includes(url),
      })}
    >
      {children}
    </Button>
  );
}
