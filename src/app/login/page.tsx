'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import Logo from '@/assets/icons/logo.svg';
import { Button } from '@/components/button/button.component';
import { TextInput } from '@/components/text-input/text-input.component';
import { useUnsafeI18n } from '@/locales/check-key';
import { useScopedI18n } from '@/locales/client';
import { loginSchema } from '@/schemas/login.schema';

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useScopedI18n('auth');
  const errorT = useUnsafeI18n();
  type FormType = z.infer<typeof loginSchema>;

  async function onSubmit(form: FormType) {
    try {
      setIsSubmitting(true);
      alert(form); // login logic
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
        <Logo className='mx-auto mt-36 h-fit w-[247px]' />
        <h1 className='text-secondary-10 type-h1 mt-32'>{t('heading')}</h1>
        <h2 className='type-body mt-1 text-primary-100'>{t('caption')}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
          <TextInput
            {...register('username')}
            className='mt-12'
            type='text'
            placeholder={t('username')}
          />
          {errors.username?.message && errorT(errors.username.message)}
          <TextInput
            {...register('password')}
            className='mt-6'
            type='password'
            placeholder={t('password')}
          />
          {errors.password?.message && errorT(errors.password.message)}
          <Link className='mt-3 underline' href='/support'>
            {t('forgot_password')}
          </Link>

          <Button className='mb-10 mt-8'>{t('login')}</Button>

          <Button
            disabled={isSubmitting}
            className='type-h6 absolute bottom-5 right-5 min-h-7 rounded bg-success-100'
          >
            {t('support')}
          </Button>
        </form>
      </main>
    </div>
  );
}
