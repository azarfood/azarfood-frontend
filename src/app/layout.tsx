import '@/configs/globals.css';
import { cn } from '@/utils/cn';
import { Montserrat } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
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

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	let messages = (await import(`@/messages/fa.json`)).default;
	return (
		<html lang="fa" dir="rtl">
			<body className={cn(montserrat.className, 'wrapper')}>
				<NextIntlClientProvider locale={'fa'} messages={messages}>
					<Providers>{children}</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
};
export default RootLayout;
