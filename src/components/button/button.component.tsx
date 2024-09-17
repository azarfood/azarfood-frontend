import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import type { ComponentProps } from 'react';

import SpinnerIcon from '@/assets/icons/spinner.svg';
import { useRipple } from '@/hooks/use-ripple';
import { cn } from '@/utils/cn';

export interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
}

const buttonVariants = {
  loading: {
    opacity: 0,
    scale: 0.8,
  },
  idle: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.15,
    },
  },
} satisfies Variants;
const spinnerVariants = {
  enter: {
    opacity: 1,
    y: '0%',
    transition: {
      delay: 0.15,
    },
  },
  exit: {
    opacity: 0,
    y: '50%',
  },
} satisfies Variants;

export function Button({
  className,
  children,
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  const { onMouseDown, ripples } = useRipple();

  return (
    <button
      className={cn(
        'type-4r relative flex min-h-11 items-center justify-center overflow-hidden rounded-lg bg-primary-100 px-4 text-foreground-100 shadow shadow-secondary-20 disabled:opacity-40',
        className,
      )}
      disabled={disabled == null ? isLoading : disabled}
      onMouseDown={onMouseDown}
      {...props}
    >
      <motion.div
        className='pointer-events-none flex items-center justify-center'
        animate={isLoading ? 'loading' : 'idle'}
        variants={buttonVariants}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            variants={spinnerVariants}
            animate='enter'
            exit='exit'
            initial='exit'
            className='pointer-events-none absolute inset-0 flex items-center justify-center'
          >
            <SpinnerIcon className='h-full py-2' />
          </motion.div>
        )}
      </AnimatePresence>
      {ripples}
    </button>
  );
}
