'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { type ComponentPropsWithRef, forwardRef } from 'react';

import { useUnsafeI18n } from '@/locales/check-key';
import { cn } from '@/utils/cn';

export interface TextInputProps extends ComponentPropsWithRef<'input'> {
  errorKey?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ className, errorKey, ...props }, ref) {
    const errorT = useUnsafeI18n();
    return (
      <>
        <input
          className={cn(
            'type-control-label min-h-11 rounded-lg border border-solid border-secondary-40 bg-transparent px-3 text-secondary-100 placeholder-secondary-40 outline-none transition focus-visible:border-secondary-100 data-[error=true]:border-error-100',
            className,
          )}
          data-error={!!errorKey}
          ref={ref}
          {...props}
        />

        <AnimatePresence>
          {errorKey && (
            <motion.div
              className='type-control-label text-error-100'
              animate={{ height: 'auto', opacity: [0, 1], y: 0 }}
              style={{
                height: '0px',
                opacity: 0,
                y: 12,
              }}
              exit={{ height: '0px', opacity: 0, y: 12 }}
            >
              {errorT(errorKey)}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  },
);
