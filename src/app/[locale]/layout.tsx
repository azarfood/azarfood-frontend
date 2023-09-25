import '@/configs/globals.css';
import { cn } from '@/utils/cn';
import { Montserrat } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Providers } from '@/store/providers';
import React from 'react';
import type { Metadata } from 'next';
export function generateStaticParams() {
	return [{ locale: 'fa' }];
}

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Azarfood',
	description: 'Where great food meets great minds.',
};

const RootLayout = async ({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) => {
	let messages = (await import(`../../messages/fa.json`)).default;
	try {
		messages = (await import(`../../messages/${locale}.json`)).default;
	} catch (error) {
		notFound();
	}
	return (
		<html lang="en" dir="rtl">
			<body className={cn(montserrat.className, 'wrapper')}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<Providers>{children}</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
};
export default RootLayout;
