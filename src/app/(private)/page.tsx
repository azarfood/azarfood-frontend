'use client';
import { useI18n } from '@/locales/client';

export default function Home() {
  const t = useI18n();
  return (
    <main className='flex h-full w-full items-center justify-center gap-4'>
      <div className='text-secondary-100'>{t('hello')}</div>
      <span className='block h-fit w-fit -rotate-90 text-primary-100'>:-)</span>
    </main>
  );
}
