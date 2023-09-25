'use client';

import { Button } from '@/components/button';
import { loginDTO } from '@/schemas/dto/auth/user/login.dto';
import { TextField } from '@/components/text-field';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import LoginFigure from '@/assets/images/login-figure.png';
import Logo from '@/assets/images/logo.png';
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
		<main className="flex h-[100dvh]">
			<figure className="relative flex-1">
				<Image
					src={LoginFigure}
					alt=""
					fill
					className="object-contain object-right"
				/>
			</figure>
			<section className="flex flex-1 flex-col items-center justify-center">
				<form
					onSubmit={handleSubmit(console.log)}
					className="relative flex w-96 flex-col gap-4 py-20"
				>
					<figure className="absolute bottom-full left-1/2 aspect-square w-48 -translate-x-1/2">
						<Image src={Logo} alt="azarfood" fill className="object-contain" />
					</figure>
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
					<Button className="mt-8 bg-[#fc614b]">{t('send_code')}</Button>
				</form>
			</section>
		</main>
	);
}
