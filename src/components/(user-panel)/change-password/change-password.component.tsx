import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';

import { TextInput } from '@/components/text-input/text-input.component';
import { useScopedI18n } from '@/locales/client';

export interface ChangePasswordProps {
  show: boolean;
  onClose(): void;
}

const changePasswordVariants = {
  enter: { opacity: 1, x: 0, y: -30 },
  exit: { opacity: 0, x: 0, y: -30 },
} satisfies Variants;

export default function ChangePassword({ show, onClose }: ChangePasswordProps) {
  const t = useScopedI18n('reset_password');
  
  const divRef = useRef(null);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className='fixed inset-0 z-20 mx-auto flex h-full w-full max-w-[430px] items-center justify-center backdrop-blur-sm'
          ref={divRef}
          onClick={onClose}
          variants={changePasswordVariants}
          initial='exit'
          exit='exit'
          animate='enter'
        >
          <div className='relative mx-16 h-[310px] border-spacing-1 rounded-lg border-[1.5px] border-secondary-40 bg-foreground-100 p-5'>
            <p className='mb-6'>{t('change_password')}</p>

            <TextInput className='w-full' placeholder={t('old_password')} />

            <TextInput
              className='my-3 w-full'
              placeholder={t('new_password')}
            />

            <TextInput className='w-full' placeholder={t('confirm_password')} />
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
