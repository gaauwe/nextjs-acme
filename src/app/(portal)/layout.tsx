import { MainNav } from './_components/main-nav/main-nav';
import MobileNav from './_components/mobile-nav/mobile-nav';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MobileNav />
      <MainNav />
      <div className="flex flex-1 m-2 lg:m-3 rounded-md lg:rounded overflow-hidden bg-background relative">
        <main className="flex flex-col flex-1 overflow-auto px-4 py-6 lg:p-8 bg-muted">{children}</main>
      </div>
    </>
  );
}
