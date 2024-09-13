'use client';

import Link from 'next/link';

import Calculator from '@/assets/icons/user-panel/calculator.svg';
import Calendar from '@/assets/icons/user-panel/calendar.svg';
import CalendarDays from '@/assets/icons/user-panel/calendar-days.svg';
import Button from '@/components/user-panel/button/button.component';
import PersonalInfo from '@/components/user-panel/personal-info-frame/personal-info-frame.component';
import { useScopedI18n } from '@/locales/client';

export default function UserPanel() {
  const t = useScopedI18n('personal_info');

  return (
    <div className='mx-auto mt-12 h-full w-[310px]'>
      <PersonalInfo />

      <Link href='./user/transactions'>
        <Button
          icon={<Calculator className='pointer-events-none mr-3 size-5' />}
          context={t('button.transaction_history')}
        />
      </Link>

      <Link href=''>
        <Button
          icon={<Calendar className='pointer-events-none mr-3 size-5' />}
          context={t('button.order_history')}
        />
      </Link>

      <Link href=''>
        <Button
          icon={<CalendarDays className='pointer-events-none mr-3 size-5' />}
          context={t('button.reservation_history')}
        />
      </Link>

      <Link href=''>
        <Button context={t('button.support')} className='bg-success-100 pr-4' />
      </Link>
    </div>
  );
}
