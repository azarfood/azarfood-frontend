'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import type { z } from 'zod';

import Logo from '@/assets/icons/logo.svg';
import { Button } from '@/components/button/button.component';
import { PasswordInput } from '@/components/password-input/password-input.component';
import { TextInput } from '@/components/text-input/text-input.component';
import { useI18n, useScopedI18n } from '@/locales/client';
import { loginSchema } from '@/schemas/login.schema';
import { UserService } from '@/services/user/user.service';
import { useAuth } from '@/stores/providers/auth-provider/auth-provider';
import { errorSchema } from '@/types/dto/error.dto';

// TODO: when logged in, redirect the user to last visited page
export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { setToken, token } = useAuth();
  const st = useScopedI18n('auth');
  const t = useI18n();
  useEffect(() => {
    if (token) {
      router.push('/');
    }
  }, [token, router, t]);

  type FormType = z.infer<typeof loginSchema>;

  async function login(form: FormType) {
    try {
      setIsSubmitting(true);
      try {
        const response = await UserService.login({
          username: form.username,
          password: form.password,
        });
        setToken(response.result.token);
        router.push('/');
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
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <main className='relative mx-auto flex min-h-svh w-full max-w-[430px] flex-col bg-foreground-100 px-10 pb-20'>
      <Logo className='mx-auto mt-[88px] h-fit w-[247px]' />
      <h1 className='text-secondary-10 type-h1 mt-16'>{st('heading')}</h1>
      <h2 className='type-body mt-1 text-primary-100'>{st('caption')}</h2>
      <form onSubmit={handleSubmit(login)} className='flex flex-col'>
        <TextInput
          {...register('username')}
          className='mt-4'
          type='text'
          placeholder={st('username')}
          errorKey={errors.username?.message}
        />
        <PasswordInput
          {...register('password')}
          className='mt-3'
          placeholder={st('password')}
          errorKey={errors.password?.message}
        />
        <Link className='mt-3 underline' href='/support'>
          {st('forgot_password')}
        </Link>

        <Button isLoading={isSubmitting} className='mb-5 mt-8'>
          {st('login')}
        </Button>
      </form>
      <Link href='/support'>
        <Button
          disabled={isSubmitting}
          className='type-h6 absolute bottom-5 right-5 min-h-7 rounded bg-success-100'
        >
          {st('support')}
        </Button>
      </Link>
    </main>
  );
}
