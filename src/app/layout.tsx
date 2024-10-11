import '@/configs/globals.css';

import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import Locale from 'intl-locale-textinfo-polyfill';
import jalaliday from 'jalaliday';
import type { Metadata } from 'next';
import { Montserrat, Vazirmatn } from 'next/font/google';

import { I18nProviderClient } from '@/locales/client';
import { Providers } from '@/stores/providers/providers';
import { cn } from '@/utils/cn';

dayjs.extend(jalaliday).calendar('jalali');
dayjs.extend(minMax);
dayjs.locale('fa');

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
  manifest: './manifest.ts',
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
      <head>
        <link
          rel='icon'
          type='image/png'
          href='/favicon-48x48.png'
          sizes='48x48'
        />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <meta name='apple-mobile-web-app-title' content='Azarfood' />
      </head>
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
