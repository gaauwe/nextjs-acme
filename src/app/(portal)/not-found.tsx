'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full">
      <h2 className="mb-2 text-[50px] font-bold leading-none sm:text-[80px] md:text-7xl">404</h2>
      <h4 className="text-2xl font-semibold leading-tight mb-8">Oops! That page can’t be found</h4>
      <Button as={Link} href="/dashboard">
        Go back home
      </Button>
    </div>
  );
}
