import '@/configs/globals.css';

import Locale from 'intl-locale-textinfo-polyfill';
import type { Metadata } from 'next';
import { Montserrat, Vazirmatn } from 'next/font/google';

import { I18nProviderClient } from '@/locales/client';
import { Providers } from '@/stores/providers/providers';
import { cn } from '@/utils/cn';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});
const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Azarfood',
  description: 'Where great food meets great minds.',
};

const locale = 'fa';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { direction: dir } = new Locale(locale).textInfo;

  return (
    <html lang={locale} dir={dir} className='h-full'>
      <body
        className={cn(
          montserrat.variable,
          vazirmatn.variable,
          'h-full bg-foreground-100 font-vazirmatn',
        )}
      >
        <I18nProviderClient locale={locale}>
          <Providers>{children}</Providers>
        </I18nProviderClient>
      </body>
    </html>
  );
}
