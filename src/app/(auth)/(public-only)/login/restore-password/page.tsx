'use client';

import { Button } from '@/components/button';
import { forgetPasswordDTO } from '@/schemas/dto/user/forget-password';
import { mute } from '@/utils/identity';
import { services } from '@/services/http';
import { TextField } from '@/components/text-field';
import { translateKey } from '@/utils/translate-key';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import toast from 'react-hot-toast';

const forgetPasswordSchema = z
	.object({
		UserCode: z.string().nonempty(),
		KeyCode: z.string().nonempty(),
		new_password: z.string().nonempty(),
		confirm_new_password: z.string().nonempty(),
	})
	.refine(data => data.new_password === data.confirm_new_password, {
		message: translateKey<'auth'>('error.confirm_password'),
		path: ['confirm_new_password'],
	});

export default function ForgetPassword() {
	const { register, formState, handleSubmit } = useForm<
		z.infer<typeof forgetPasswordSchema>
	>({
		resolver: zodResolver(forgetPasswordSchema),
		mode: 'onTouched',
	});
	const t = useTranslations('auth');
	const router = useRouter();
	async function login(dto: z.infer<typeof forgetPasswordSchema>) {
		const requestDTO = forgetPasswordDTO.safeParse({
			...dto,
		});
		if (requestDTO.success) {
			const res = await toast
				.promise(services.auth.restorePassword(requestDTO.data), {
					loading: t('login_pending'),
					success: t('login_success'),
					error: e =>
						e.response.data.massage ??
						t('error.error_general', { operation: t('restore_password') }),
				})
				.catch(mute);
			if (res) {
				router.push('/login');
			}
		} else {
			toast.error(
				t('error.error_general', { operation: t('restore_password') }),
			);
		}
	}
	return (
		<form
			onSubmit={handleSubmit(login)}
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
				title={t('sama_password')}
			/>
			<TextField
				error={formState.errors.new_password?.message}
				isTouched={formState.touchedFields.new_password}
				{...register('new_password')}
				title={t('new_password')}
			/>
			<TextField
				error={formState.errors.confirm_new_password?.message}
				isTouched={formState.touchedFields.confirm_new_password}
				{...register('confirm_new_password')}
				title={t('confirm_password')}
			/>
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
