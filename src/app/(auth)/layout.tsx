'use client';

import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LoginFigure from '@/assets/images/login-figure.svg';
import RegisterFigure from '@/assets/images/register-figure.svg';
import type { PropsWithChildren } from 'react';

export default function Register({ children }: PropsWithChildren) {
	const t = useTranslations('auth');
	const pathName = usePathname();
	const isLogin = pathName.startsWith('/login');
	return (
		<main className="full-bleed flex h-[100dvh]">
			<AnimatePresence mode="popLayout">
				<motion.figure
					key={String(isLogin)}
					className="relative hidden flex-1 xl:block"
					exit={{ opacity: 0 }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					{isLogin ? (
						<LoginFigure className="h-full" />
					) : (
						<RegisterFigure className="h-full" />
					)}
				</motion.figure>
			</AnimatePresence>
			<section className="flex flex-1 flex-col items-center justify-center">
				<nav className="flex gap-12 text-center text-xl font-semibold text-muted">
					<Link
						className="min-w-[6.5rem] border-b data-[active='true']:border-primary data-[active='true']:text-primary"
						href="/login"
						data-active={isLogin}
					>
						{t('login')}
					</Link>
					<Link
						className="min-w-[6.5rem] border-b data-[active='true']:border-primary data-[active='true']:text-primary"
						href="/register"
						data-active={!isLogin}
					>
						{t('register')}
					</Link>
				</nav>
				{children}
			</section>
		</main>
	);
}
