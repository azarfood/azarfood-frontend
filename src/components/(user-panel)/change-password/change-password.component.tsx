import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/button/button.component';
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
  const tt = useScopedI18n('general');

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className='fixed inset-0 z-20 mx-auto flex h-full w-full max-w-[430px] items-center justify-center backdrop-blur-sm'
          variants={changePasswordVariants}
          initial='exit'
          exit='exit'
          animate='enter'
        >
          <button className='absolute inset-0' onClick={onClose}></button>
          <div className='relative mx-16 h-[310px] border-spacing-1 rounded-lg border-[1.5px] border-secondary-40 bg-foreground-100 p-5'>
            <p className='mb-6'>{t('change_password')}</p>

            <TextInput className='w-full' placeholder={t('old_password')} />

            <TextInput
              className='my-3 w-full'
              placeholder={t('new_password')}
            />

            <TextInput className='w-full' placeholder={t('confirm_password')} />

            <div className='type-h3 absolute bottom-5 left-5 right-5 flex flex-row gap-2 text-foreground-100'>
              <Button className='dark type-h3 min-h-6 w-full rounded-[4px] bg-success-100'>
                {tt('confirm')}
              </Button>
              <Button className='dark type-h3 min-h-6 w-full rounded-[4px] bg-error-100'
                      onClick={onClose}>
                {tt('cancel')}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
