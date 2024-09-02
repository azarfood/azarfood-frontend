'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import Logo from '@/assets/icons/logo.svg';
import { Button } from '@/components/button/button.component';
import { TextInput } from '@/components/text-input/text-input.component';
import { useScopedI18n } from '@/locales/client';
import { loginSchema } from '@/schemas/login.schema';

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useScopedI18n('auth');

  type FormType = z.infer<typeof loginSchema>;

  async function onSubmit(form: FormType) {
    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      void form;
    } finally {
      setIsSubmitting(false);
    }
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div>
      <main className='relative mx-auto flex min-h-svh w-full max-w-[430px] flex-col bg-foreground-100 p-10'>
        <div className='flex flex-1 flex-col'>
          <Logo className='m-auto h-fit w-[247px] pt-20' />
          <h1 className='text-secondary-10 type-h1 mt-28'>{t('heading')}</h1>
          <h2 className='type-body mt-1 text-primary-100'>{t('caption')}</h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-1 flex-col'
        >
          <TextInput
            autoComplete='family-name'
            {...register('username')}
            className='mt-12'
            type='text'
            placeholder={t('username')}
            errorKey={errors.username?.message}
          />
          <TextInput
            {...register('password')}
            className='mt-6'
            type='password'
            placeholder={t('password')}
            errorKey={errors.password?.message}
          />
          <Link className='mt-3 underline' href='/support'>
            {t('forgot_password')}
          </Link>

          <Button isLoading={isSubmitting} className='mb-10 mt-8'>
            {t('login')}
          </Button>
        </form>
        <Button
          disabled={isSubmitting}
          className='type-h6 absolute bottom-5 right-5 min-h-7 rounded bg-success-100'
        >
          {t('support')}
        </Button>
      </main>
    </div>
  );
}
