'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full">
      <h2 className="mb-2 text-[50px] font-bold leading-none sm:text-[80px] md:text-7xl">500</h2>
      <h4 className="text-2xl font-semibold leading-tight mb-8">Oeps! Er is iets fout gegaan</h4>
      <Button onClick={() => reset()}>Probeer opnieuw</Button>
    </div>
  );
}
