import { Package2 } from 'lucide-react';
import Link from 'next/link';

import { MainNav } from './_components/main-nav/main-nav';
import MobileHeader from './_components/mobile-header/mobile-header';
import { UserNav } from './_components/UserNav/UserNav';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MobileHeader />
      <div className="items-center px-4 hidden lg:flex lg:pt-5 lg:pb-2">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6 text-primary" />
          <span className="text-primary">Acme Inc</span>
        </Link>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {/* <Search /> */}
          <UserNav user={{ email: 'john.doe@acme.com' }} />
        </div>
      </div>

      <div className="flex flex-1 m-2 lg:m-3 rounded-md lg:rounded overflow-hidden bg-background relative">
        <main className="flex flex-col flex-1 overflow-auto px-4 py-6 lg:p-8 bg-muted">{children}</main>
      </div>
    </>
  );
}
