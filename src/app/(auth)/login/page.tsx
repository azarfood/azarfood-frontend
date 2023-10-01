'use client';

import { Button } from '@/components/button';
import { loginDTO } from '@/schemas/dto/auth/user/login.dto';
import { TextField } from '@/components/text-field';
import { useForm } from 'react-hook-form';
import { useId } from 'react';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import Checkbox from '@/components/checkbox';
import Link from 'next/link';
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
	return (
		<form
			onSubmit={handleSubmit(console.log)}
			className="relative flex w-96 flex-col gap-4 py-20"
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
