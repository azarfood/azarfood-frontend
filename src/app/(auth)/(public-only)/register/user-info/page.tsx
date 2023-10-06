'use client';

import { Button } from '@/components/button';
import { mute } from '@/utils/identity';
import { registerCompleteDTO } from '@/schemas/dto/auth/user/register-complete.dto';
import { services } from '@/services/http';
import { TextField } from '@/components/text-field';
import { translateKey } from '@/utils/translate-key';
import { useForm } from 'react-hook-form';
import { useId } from 'react';
import {
	USER_CODE_SEARCH_PARAM,
	USER_KEY_SEARCH_PARAM,
} from '@/configs/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Checkbox from '@/components/checkbox';
import toast from 'react-hot-toast';
const registerCompleteInputDTO = z
	.object({
		name: z.string().nonempty(),
		last_name: z.string().nonempty(),
		password: z.string().nonempty(),
		confirm_password: z.string().nonempty(),
		phone_number: z.string().nonempty(),
	})
	.refine(data => data.password === data.confirm_password, {
		message: translateKey<'auth'>('error.confirm_password'),
		path: ['confirm_password'],
	});

export default function RegisterUserInfo() {
	const { register, formState, handleSubmit } = useForm<
		z.infer<typeof registerCompleteInputDTO>
	>({
		resolver: zodResolver(registerCompleteInputDTO),
		mode: 'onTouched',
	});
	const t = useTranslations('auth');
	const checkboxId = useId();
	const params = useSearchParams();
	const router = useRouter();
	async function handleRegisterComplete(
		dto: z.infer<typeof registerCompleteInputDTO>,
	) {
		const userInfo = registerCompleteDTO.safeParse({
			...dto,
			UserCode: params.get(USER_CODE_SEARCH_PARAM),
			KeyCode: params.get(USER_KEY_SEARCH_PARAM),
		});
		if (userInfo.success) {
			const res = await toast
				.promise(services.auth.registerComplete(userInfo.data), {
					loading: t('login_pending'),
					success: res => res.data.massage,
					error: e => e.response.data.message,
				})
				.catch(mute);
			if (res) {
				router.push('/login');
			}
		} else {
			toast.error(t('error.register'));
			router.push('/register');
		}
	}
	return (
		<form
			onSubmit={handleSubmit(handleRegisterComplete)}
			className="relative flex w-full max-w-[24rem] flex-col gap-4 px-2 py-20"
		>
			<div className="flex gap-5">
				<TextField
					error={formState.errors.name?.message}
					isTouched={formState.touchedFields.name}
					{...register('name')}
					title={t('name')}
				/>
				<TextField
					error={formState.errors.last_name?.message}
					isTouched={formState.touchedFields.last_name}
					{...register('last_name')}
					title={t('last_name')}
				/>
			</div>
			<TextField
				error={formState.errors.password?.message}
				isTouched={formState.touchedFields.password}
				{...register('password')}
				title={t('password')}
			/>
			<TextField
				error={formState.errors.confirm_password?.message}
				isTouched={formState.touchedFields.confirm_password}
				{...register('confirm_password')}
				title={t('confirm_password')}
			/>
			<TextField
				error={formState.errors.phone_number?.message}
				isTouched={formState.touchedFields.phone_number}
				{...register('phone_number')}
				title={t('phone_number')}
			/>
			<Checkbox id={checkboxId} className="mt-3">
				<Checkbox.Indicator />
				<Checkbox.Label>{t('accept_the_terms')}</Checkbox.Label>
			</Checkbox>
			<Button type="submit" className="mt-6 bg-[#F18817] bg-opacity-60">
				{t('register')}
			</Button>
		</form>
	);
}
