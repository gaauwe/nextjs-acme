'use client';

import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '../ui/button';

export function SubmitButton({ children, ...props }: ButtonProps<"button">) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} loading={pending} {...props}>
      {children}
    </Button>
  );
}
