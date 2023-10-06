'use client';

import { AUTH_TOKEN_STORAGE_KEY } from '@/configs/constants';
import { Button } from '@/components/button';
import { loginDTO } from '@/schemas/dto/auth/user/login.dto';
import { ls } from '@/services/localstorage.service';
import { mute } from '@/utils/identity';
import { services } from '@/services/http';
import { setUser } from '@/store/redux/slices/user-slice';
import { TextField } from '@/components/text-field';
import { useAppDispatch } from '@/store/redux/hooks';
import { useForm } from 'react-hook-form';
import { useId } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import Checkbox from '@/components/checkbox';
import Link from 'next/link';
import toast from 'react-hot-toast';
import type { z } from 'zod';

export default function Login() {
	const { register, formState, handleSubmit } = useForm<
		z.infer<typeof loginDTO>
	>({
		resolver: zodResolver(loginDTO),
		mode: 'onTouched',
	});
	const t = useTranslations('auth');
	const checkboxId = useId();
	const dispatch = useAppDispatch();
	const router = useRouter();
	async function login(dto: z.infer<typeof loginDTO>) {
		const res = await toast
			.promise(services.auth.login(dto), {
				loading: t('login_pending'),
				success: t('login_success'),
				error: e => e.response.data.massage ?? t('login_error'),
			})
			.catch(mute);
		if (res?.data) {
			dispatch(
				setUser({
					access_token: res.data.access_token,
				}),
			);
			ls.set(AUTH_TOKEN_STORAGE_KEY, res.data.access_token);
			router.push('/private');
		}
	}
	return (
		<form
			onSubmit={handleSubmit(login)}
			className="relative flex w-full max-w-[24rem] flex-col gap-4 px-2 py-20"
		>
			<TextField
				error={formState.errors.username?.message}
				isTouched={formState.touchedFields.username}
				{...register('username')}
				title={t('student_no')}
			/>
			<TextField
				error={formState.errors.password?.message}
				isTouched={formState.touchedFields.password}
				{...register('password')}
				title={t('password')}
			/>
			<Checkbox id={checkboxId} className="mt-3">
				<Checkbox.Indicator />
				<Checkbox.Label>{t('remember_me')}</Checkbox.Label>
			</Checkbox>
			<Button className="mt-6 bg-[#fc614b]">{t('send_code')}</Button>
			<Link
				href="/login/restore"
				className="w-full text-center text-base font-medium text-primary-dark"
			>
				{t('restore_password')}
			</Link>
		</form>
	);
}
