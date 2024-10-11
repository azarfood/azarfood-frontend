'use client';
import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import type { ComponentPropsWithRef } from 'react';
import { forwardRef } from 'react';

import { useUnsafeI18n } from '@/locales/check-key';
import { cn } from '@/utils/cn';

export interface SelectInput extends ComponentPropsWithRef<'select'> {
  errorKey?: string;
}
const errorMessageVariants = {
  enter: { height: 'auto', opacity: [0, 1], y: 0, marginTop: '4px' },
  exit: { height: '0px', opacity: 0, y: 12, marginTop: '0px' },
} satisfies Variants;

export const SelectInput = forwardRef<HTMLSelectElement, SelectInput>(
  function SelectInput({ className, errorKey, ...props }, ref) {
    const errorT = useUnsafeI18n();
    return (
      <>
        <select
          className={cn(
            'type-control-label h-5 rounded bg-secondary-5 px-3 text-secondary-100 placeholder-secondary-40 outline-none transition focus-visible:border-secondary-100 data-[error=true]:border-error-100',
            className,
          )}
          data-error={!!errorKey}
          ref={ref}
          {...props}
        />

        <AnimatePresence>
          {errorKey && (
            <motion.div
              className='type-3r mx-1 text-error-100'
              variants={errorMessageVariants}
              animate='enter'
              initial='exit'
              exit='exit'
              transition={{
                ease: 'easeInOut',
              }}
            >
              {errorT(errorKey)}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  },
);
