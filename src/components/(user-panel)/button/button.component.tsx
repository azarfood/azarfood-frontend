'use client';

import type { ComponentProps } from 'react';

import { useRipple } from '@/hooks/use-ripple';
import { cn } from '@/utils/cn';

export interface ButtonProps extends ComponentProps<'button'> {
  icon?: React.ReactNode;
  context: string;
}

export default function Button({ icon, context, className }: ButtonProps) {
  const { onMouseDown, ripples } = useRipple();

  return (
    <button
      className={cn(
        'dark relative my-4 flex h-9 w-full flex-row items-center gap-2 overflow-hidden rounded-lg bg-primary-100 text-[14px] text-foreground-100 shadow-simple-01',
        className,
      )}
      onMouseDown={onMouseDown}
    >
      {icon}
      <p className='pointer-events-none'>{context}</p>
      {ripples}
    </button>
  );
}
