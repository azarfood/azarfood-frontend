import type { Transition } from 'framer-motion';
import { motion } from 'framer-motion';
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
    y: '-100%',
  },
  idle: {
    opacity: 1,
    y: '0%',
  },
} satisfies Transition;
const spinnerVariants = {
  loading: {
    opacity: 1,
    y: '0%',
  },
  idle: {
    opacity: 0,
    y: '100%',
  },
} satisfies Transition;

// TODO: remove spinner on animate exit

export function Button({
  className,
  children,
  isLoading,
  ...props
}: ButtonProps) {
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
      <motion.div
        className='pointer-events-none flex items-center justify-center'
        animate={isLoading ? 'loading' : 'idle'}
        variants={buttonVariants}
      >
        {children}
      </motion.div>

      <motion.div
        variants={spinnerVariants}
        animate={isLoading ? 'loading' : 'idle'}
        style={{ y: '100%', opacity: '0' }}
        className='pointer-events-none absolute inset-0 flex items-center justify-center'
      >
        <SpinnerIcon className='h-full py-2' />
      </motion.div>
      {ripples}
    </button>
  );
}
