'use client';

import { Button } from '@/components/button';
import { mute } from '@/utils/identity';
import { registerDTO } from '@/schemas/dto/auth/user/register.dto';
import { services } from '@/services/http';
import { TextField } from '@/components/text-field';
import { useForm } from 'react-hook-form';
import {
	USER_CODE_SEARCH_PARAM,
	USER_KEY_SEARCH_PARAM,
} from '@/configs/constants';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import type { z } from 'zod';

export default function Register() {
	const { register, formState, handleSubmit } = useForm<
		z.infer<typeof registerDTO>
	>({
		resolver: zodResolver(registerDTO),
		mode: 'onTouched',
	});
	const t = useTranslations('auth');
	const router = useRouter();
	async function handleRegister(dto: z.infer<typeof registerDTO>) {
		const res = await toast
			.promise(services.auth.register(dto), {
				loading: t('login_pending'),
				success: res => res.data.massage,
				error: e => e.response.data.massage,
			})
			.catch(mute);
		if (res) {
			const redirectURL = new URL(
				'/register/user-info',
				window.location.origin,
			);
			const redirectSearchParams = new URLSearchParams();
			redirectSearchParams.set(USER_KEY_SEARCH_PARAM, dto.KeyCode);
			redirectSearchParams.set(USER_CODE_SEARCH_PARAM, dto.UserCode);
			redirectURL.search = redirectSearchParams.toString();
			router.push(redirectURL.toString());
		}
	}
	return (
		<form
			onSubmit={handleSubmit(handleRegister)}
			className="relative flex w-full max-w-[24rem] flex-col gap-4 px-2 py-20"
		>
			<TextField
				error={formState.errors.UserCode?.message}
				isTouched={formState.touchedFields.UserCode}
				{...register('UserCode')}
				title={t('student_no')}
			/>
			<TextField
				error={formState.errors.KeyCode?.message}
				isTouched={formState.touchedFields.KeyCode}
				{...register('KeyCode')}
				title={t('password')}
			/>
			<Button className="mt-6 bg-[#F18817] bg-opacity-60">
				{t('send_code')}
			</Button>
		</form>
	);
}
