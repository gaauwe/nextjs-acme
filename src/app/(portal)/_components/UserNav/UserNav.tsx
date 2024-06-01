'use client';

import { signOut } from '@/actions/login';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import '@/lib/supressLogs';

interface UserNav {
  user: {
    email: string;
    image?: string;
  };
  alignOffset?: number;
  align?: 'start' | 'end';
}

export function UserNav({ user, ...props }: UserNav) {
  const name = user.email
    .split('@')[0]
    .split('.')
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join(' ');

  return (
    <div className="flex gap-x-3 lg:px-4 lg:py-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="relative size-10 lg:h-8 lg:w-8 rounded-full border max-lg:border-[rgb(39,39,42)] max-lg:hover:bg-[rgb(39,39,42)] lg:border-none max-lg:bg-[rgba(39,39,42,0.4)]"
          >
            <Avatar
              className="size-10 lg:h-8 lg:w-8"
              src={user.image}
              width={32}
              height={32}
              fallback={name
                .split(' ')
                .map((item) => item[0].toUpperCase())
                .join('')}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent alignOffset={0} sideOffset={14} className="w-56" align="start" forceMount {...props}>
          <DropdownMenuLabel className="font-normal lg:hidden">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-xs leading-none text-muted-foreground">john.doe@acme.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="lg:hidden" />
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()} className="!text-destructive">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex-col space-y-1 hidden lg:flex">
        <p className="text-sm font-medium leading-none text-background">{name}</p>
        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
}
