import { LucideIcon } from 'lucide-react';

interface EmptyStatePlaceholderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  children?: React.ReactNode;
}

export function EmptyStatePlaceholder({ title, subtitle, icon: Icon, children }: EmptyStatePlaceholderProps) {
  return (
    <div className="flex flex-1 shrink-0 items-center justify-center rounded-md bg-white border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <Icon className="h-10 w-10 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
