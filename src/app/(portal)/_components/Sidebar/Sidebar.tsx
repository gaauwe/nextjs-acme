import { LayoutGrid, Library, ListMusic, Mic2, Music2, PlayCircle, Radio, User } from 'lucide-react';

import SidebarItem from '@/app/(portal)/_components/SidebarItem/SidebarItem';
import { UserNav } from '@/app/(portal)/_components/UserNav/UserNav';
import { cn } from '@/lib/utils';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export async function Sidebar({ className }: SidebarProps) {
  return (
    <div id="sidebar" className={cn('bg-sidebar', className)}>
      <div className="space-y-4 py-4 flex-1">
        <div className="px-3 py-2">
          {MENU_ITEMS.map((item) => (
            <div key={item.title} className="mt-8 first:mt-0">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-sidebar-foreground">{item.title}</h2>
              <div className="flex flex-col space-y-1">
                {item.items.map((subItem) => {
                  const Icon = subItem.icon;

                  return (
                    <SidebarItem key={subItem.title} url={subItem.url}>
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
      <UserNav user={{ email: 'john.doe@acme.com' }} />
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
    title: 'Library',
    items: [
      { title: 'Playlists', icon: ListMusic, url: '/playlists' },
      { title: 'Songs', icon: Music2, url: '/songs' },
      { title: 'Made for You', icon: User, url: '/made-for-you' },
      { title: 'Artists', icon: Mic2, url: '/artists' },
      { title: 'Albums', icon: Library, url: '/albums' },
    ],
  },
];
