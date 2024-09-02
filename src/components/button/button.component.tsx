import type { ComponentProps } from 'react';

import { useRipple } from '@/hooks/use-ripple';
import { cn } from '@/utils/cn';

export type ButtonProps = ComponentProps<'button'>;
export function Button({ className, children, ...props }: ButtonProps) {
  const { onMouseDown, ripples } = useRipple();
  return (
    <button
      className={cn(
        'type-control relative flex min-h-11 items-center justify-center overflow-hidden rounded-lg bg-primary-100 px-4 text-foreground-100 shadow shadow-secondary-20',
        className,
      )}
      onMouseDown={onMouseDown}
      {...props}
    >
      {children}
      {ripples}
    </button>
  );
}
