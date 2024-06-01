import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex relative items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonBaseProps<E extends React.ElementType = 'button'> = {
  as?: E;
  asChild?: boolean;
  disabled?: boolean;
  loading?: boolean;
} & VariantProps<typeof buttonVariants>;

export type ButtonProps<E extends React.ElementType> = ButtonBaseProps<E> & Omit<React.ComponentProps<E>, keyof ButtonBaseProps>;

const Button: <E extends React.ElementType = 'button'>({ props }: ButtonProps<E>) => React.ReactNode | null = React.forwardRef(
  function Button<E extends React.ElementType = 'button'>(
    { as, asChild, variant, size, className, loading, disabled, ...props }: ButtonProps<E>,
    ref: React.Ref<HTMLButtonElement>,
  ) {
    const Element = React.useMemo(() => {
      if (as && !props.disabled) {
        return as;
      }

      return asChild ? Slot : 'button';
    }, [as, asChild, props.disabled]);

    return (
      <Element className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} disabled={disabled || loading}>
        <span className={cn('inline-flex items-center justify-center gap-2 align-top', { invisible: loading })}>{props.children}</span>
        {loading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <LoaderCircle className="h-5 w-5 animate-spin" />
          </div>
        )}
      </Element>
    );
  },
);

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
