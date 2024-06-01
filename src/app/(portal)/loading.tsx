import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center flex-1 h-full">
      <LoaderCircle className="h-7 w-7 animate-spin" />
    </div>
  );
}
