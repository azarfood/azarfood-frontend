'use client';

import { Button } from '@/components/button';
import { loginDTO } from '@/schemas/dto/auth/user/login.dto';
import { TextField } from '@/components/text-field';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

export default function Register() {
	const { register, formState, handleSubmit } = useForm<
		z.infer<typeof loginDTO>
	>({
		resolver: zodResolver(loginDTO),
		mode: 'onTouched',
	});
	const t = useTranslations('auth');
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
			<Button className="mt-6 bg-[#F18817] bg-opacity-60">
				{t('send_code')}
			</Button>
		</form>
	);
}
