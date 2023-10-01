'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LoginFigure from '@/assets/images/login-figure.svg';
import type { PropsWithChildren } from 'react';

export default function Register({ children }: PropsWithChildren) {
	const t = useTranslations('auth');
	const pathName = usePathname();
	return (
		<main className="full-bleed flex h-[100dvh]">
			<figure className="relative hidden flex-1 xl:block">
				<LoginFigure className="h-full" />
			</figure>
			<section className="flex flex-1 flex-col items-center justify-center">
				<nav className="flex gap-12 text-center text-xl font-semibold text-muted">
					<Link
						className="min-w-[6.5rem] border-b data-[active='true']:border-primary data-[active='true']:text-primary"
						href="/login"
						data-active={pathName.startsWith('/login')}
					>
						{t('login')}
					</Link>
					<Link
						className="min-w-[6.5rem] border-b data-[active='true']:border-primary data-[active='true']:text-primary"
						href="/register"
						data-active={pathName.startsWith('/register')}
					>
						{t('register')}
					</Link>
				</nav>
				{children}
			</section>
		</main>
	);
}
