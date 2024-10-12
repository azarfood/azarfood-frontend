import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { z } from 'zod';

import { Button } from '@/components/button/button.component';
import { TextInput } from '@/components/text-input/text-input.component';
import { useI18n, useScopedI18n } from '@/locales/client';
import { changePasswordSchema } from '@/schemas/change-password.schema';
import { UserService } from '@/services/user/user.service';
import { errorSchema } from '@/types/dto/error.dto';

export interface ChangePasswordProps {
  show: boolean;
  onClose(): void;
}

const changePasswordVariants = {
  enter: { opacity: 1, x: 0, y: -30 },
  exit: { opacity: 0, x: 0, y: -30 },
} satisfies Variants;

export default function ChangePassword({ show, onClose }: ChangePasswordProps) {
  const st = useScopedI18n('reset_password'); //inputs
  const t = useI18n();
  const tt = useScopedI18n('general'); //buttons

  const [isSubmitting, setIsSubmitting] = useState(false);

  type FormType = z.infer<typeof changePasswordSchema>;

  async function changePassword(form: FormType) {
    try {
      setIsSubmitting(true);
      try {
        const response = await UserService.changePassword({
          old_password: form.old_password,
          new_password: form.new_password,
        });
        onClose();
        toast.success(response.message ?? st('success_message'));
        void response;
      } catch (err: unknown) {
        const error = errorSchema.safeParse(
          (err as AxiosError)?.response?.data,
        );
        if (error.success) {
          toast.error(error.data.message);
        } else {
          toast.error(t('auth.errors.invalid_credentials'));
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(changePasswordSchema),
  });

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
          <form
            onSubmit={handleSubmit(changePassword)}
            className='absolute mx-16 w-full max-w-[310px] border-spacing-1 rounded-lg border-[1.5px] border-secondary-40 bg-foreground-100 p-5'
          >
            <p className='mb-6'>{st('change_password')}</p>

            <TextInput
              {...register('old_password')}
              className='w-full'
              placeholder={st('old_password')}
              errorKey={errors.old_password?.message}
            />

            <TextInput
              {...register('new_password')}
              className='mt-3 w-full'
              placeholder={st('new_password')}
              errorKey={errors.new_password?.message}
            />

            <TextInput
              {...register('confirmation')}
              className='mt-3 w-full'
              placeholder={st('confirm_password')}
              errorKey={errors.confirmation?.message}
            />

            <div className='mt-12 flex flex-row gap-2 text-foreground-100'>
              <Button
                isLoading={isSubmitting}
                className='dark type-3r min-h-6 w-full rounded-[4px] bg-success-100'
              >
                {tt('confirm')}
              </Button>

              <Button
                className='dark type-3r min-h-6 w-full rounded-[4px] bg-error-100'
                onClick={onClose}
                type='button'
                disabled={isSubmitting}
              >
                {tt('cancel')}
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
