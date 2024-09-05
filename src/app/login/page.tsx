'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { z } from 'zod';

import Logo from '@/assets/icons/logo.svg';
import { Button } from '@/components/button/button.component';
import { PasswordInput } from '@/components/password-input/password-input.component';
import { TextInput } from '@/components/text-input/text-input.component';
import { useScopedI18n } from '@/locales/client';
import { loginSchema } from '@/schemas/login.schema';
import { StorageService } from '@/services/storage/storage.service';
import { UserService } from '@/services/user/user.service';
import { useAuth } from '@/stores/providers/auth-provider';

// TODO: when logged in, redirect the user to last visited page
export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();
  const t = useScopedI18n('auth');

  type FormType = z.infer<typeof loginSchema>;

  async function login(form: FormType) {
    try {
      setIsSubmitting(true);
      const response = await UserService.login({
        username: form.username,
        password: form.password,
      });
      if (response.success) {
        StorageService.user_token.set(response.data.access_token);
        setUser(response.data.user);
        router.push('/');
      } else {
        toast.error(response.message);
      }
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
      <main className='relative mx-auto flex min-h-svh w-full max-w-[430px] flex-col bg-foreground-100 px-10 pb-20'>
        <Logo className='mx-auto mt-[88px] h-fit w-[247px]' />
        <h1 className='text-secondary-10 type-h1 mt-16'>{t('heading')}</h1>
        <h2 className='type-body mt-1 text-primary-100'>{t('caption')}</h2>
        <form onSubmit={handleSubmit(login)} className='flex flex-col'>
          <TextInput
            {...register('username')}
            className='mt-4'
            type='text'
            placeholder={t('username')}
            errorKey={errors.username?.message}
          />
          <PasswordInput
            {...register('password')}
            className='mt-3'
            placeholder={t('password')}
            errorKey={errors.password?.message}
          />
          <Link className='mt-3 underline' href='/support'>
            {t('forgot_password')}
          </Link>

          <Button isLoading={isSubmitting} className='mb-5 mt-8'>
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
