'use client';

import { signOut } from '@/actions/login';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import '@/lib/supressLogs';

interface UserNav {
  user: {
    email: string;
    image?: string;
  };
}

export function UserNav({ user }: UserNav) {
  const name = user.email
    .split('@')[0]
    .split('.')
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join(' ');

  return (
    <div className="flex gap-x-3 px-4 py-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar
              className="h-8 w-8"
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
        <DropdownMenuContent arrowPadding={10} alignOffset={-7} sideOffset={10} className="w-56" align="start" forceMount>
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
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none text-background">{name}</p>
        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
}
