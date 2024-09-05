'use client';

import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import EyeIcon from '@/assets/icons/eye.svg';
import EyeSlashIcon from '@/assets/icons/eye-slash.svg';
import { cn } from '@/utils/cn';

import {
  TextInput,
  type TextInputProps,
} from '../text-input/text-input.component';

export interface PasswordInputProps extends Exclude<TextInputProps, 'type'> {
  errorKey?: string;
}
const eyeIconVariants = {
  enter: { opacity: 1 },
  exit: { opacity: 0 },
} satisfies Variants;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ className, ...props }, ref) {
    const [inputType, setInputType] = useState<'text' | 'password'>('password');
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!, []);
    return (
      <div className={cn('relative flex flex-col focus:opacity-10', className)}>
        <TextInput
          className='flex-1'
          type={inputType}
          {...props}
          ref={inputRef}
        />
        <AnimatePresence>
          <motion.button
            variants={eyeIconVariants}
            exit='exit'
            initial='exit'
            animate='enter'
            type='button'
            key={inputType}
            className='absolute left-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center p-2'
            onClick={() => {
              setInputType(inputType === 'text' ? 'password' : 'text');
              inputRef.current?.focus();
            }}
          >
            {inputType === 'text' && (
              <EyeIcon className='stroke-secondary-20' />
            )}
            {inputType === 'password' && (
              <EyeSlashIcon className='stroke-secondary-20' />
            )}
          </motion.button>
        </AnimatePresence>
      </div>
    );
  },
);
