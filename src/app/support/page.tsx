'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import GmailIcon from '@/assets/icons/gmail.svg';
import TelegramIcon from '@/assets/icons/telegram.svg';
import { Button } from '@/components/button/button.component';
import { MainLayout } from '@/components/main-layout/main-layout.component';
import { useScopedI18n } from '@/locales/client';

export default function ReservedFoodPage() {
  const t = useScopedI18n('support');
  const router = useRouter();

  return (
    <MainLayout shouldShowFooter={false}>
      <div className='type-sb mt-4 flex items-center rounded-lg bg-success-100 text-foreground-100'>
        <span className='px-3'>{t('title')}</span>
        <Button
          className='dark mr-auto bg-transparent shadow-none'
          onClick={router.back}
        >
          <ArrowLeftIcon />
        </Button>
      </div>
      <div className='type-4m mt-7 rounded-lg border-2 border-success-100 bg-foreground-100 p-4 text-secondary-60'>
        {t('text')}
        <div className='type-3m mt-3 flex flex-col items-end space-y-3 p-3'>
          <Link
            className='flex items-center space-x-2'
            href='https://t.me/azarFoodSupport'
          >
            azarFoodSupport@
            <TelegramIcon className='mx-2 h-5 w-5' />
          </Link>
          <Link
            className='flex items-center space-x-2'
            href='mailto:azarFoodSupport@gmail.com'
          >
            azarFoodSupport@gmail.com
            <GmailIcon className='mx-2 h-5 w-5' />
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
