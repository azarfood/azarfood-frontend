import { type ComponentPropsWithRef, forwardRef } from 'react';

import { cn } from '@/utils/cn';

export type TextInputProps = ComponentPropsWithRef<'input'>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ className, ...props }, ref) {
    return (
      <input
        className={cn(
          'type-control-label min-h-11 rounded-lg border border-solid border-secondary-40 bg-transparent px-3 text-secondary-100 placeholder-secondary-40 outline-none transition focus-visible:border-secondary-100',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
