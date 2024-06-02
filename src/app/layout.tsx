import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from 'next/font/google';

import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

import '@/lib/supressLogs';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-sidebar h-screen flex flex-col')}>
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
      <Toaster richColors />
    </html>
  );
}
