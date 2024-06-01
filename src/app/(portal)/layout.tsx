import MobileHeader from './_components/mobile-header/mobile-header';
import { Sidebar } from './_components/Sidebar/Sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MobileHeader />
      <div className="flex flex-1">
        <Sidebar className="hidden lg:flex lg:flex-col w-64" />
        <div className="flex-1 lg:m-3 lg:rounded overflow-hidden bg-background relative">
          <div id="nprogress-parent" />
          <main className="h-full max-h-[calc(100vh-24px)] overflow-auto px-4 py-6 lg:p-8 bg-white">{children}</main>
        </div>
      </div>
    </>
  );
}
