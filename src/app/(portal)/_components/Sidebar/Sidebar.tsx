import { LayoutGrid, ListChecks, PackageSearch, PlayCircle, Radio } from 'lucide-react';

import SidebarItem from '@/app/(portal)/_components/SidebarItem/SidebarItem';
import { UserNav } from '@/app/(portal)/_components/UserNav/UserNav';
import { cn } from '@/lib/utils';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

export function Sidebar({ className, onClick }: SidebarProps) {
  return (
    <div id="sidebar" className={cn('bg-sidebar h-full', className)}>
      <div className="space-y-4 py-4 flex-1">
        <div className="px-3 py-2">
          {MENU_ITEMS.map((item) => (
            <div key={item.title} className="mt-8 first:mt-0">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-sidebar-foreground">{item.title}</h2>
              <div className="flex flex-col space-y-1">
                {item.items.map((subItem) => {
                  const Icon = subItem.icon;

                  return (
                    <SidebarItem key={subItem.title} url={subItem.url} onClick={onClick}>
                      <Icon className="w-4 h-4 mr-3" />
                      {subItem.title}
                    </SidebarItem>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block">
        <UserNav user={{ email: 'john.doe@acme.com' }} />
      </div>
    </div>
  );
}

const MENU_ITEMS = [
  {
    title: 'Discover',
    items: [
      { title: 'Listen Now', icon: PlayCircle, url: '/listen-now' },
      { title: 'Browse', icon: LayoutGrid, url: '/browse' },
      { title: 'Radio', icon: Radio, url: '/radio' },
    ],
  },
  {
    title: 'Organization',
    items: [
      { title: 'Products', icon: PackageSearch, url: '/members' },
      { title: 'Tasks', icon: ListChecks, url: '/tasks' },
    ],
  },
];
