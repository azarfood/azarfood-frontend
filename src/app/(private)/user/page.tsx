'use client';

import Link from 'next/link';

import Calculator from '@/assets/icons/user-panel/calculator.svg';
import Calendar from '@/assets/icons/user-panel/calendar.svg';
import CalendarDays from '@/assets/icons/user-panel/calendar-days.svg';
import Button from '@/components/(user-panel)/button/button.component';
import PersonalInfo from '@/components/(user-panel)/personal-info-frame/personal-info-frame.component';
import { useScopedI18n } from '@/locales/client';
import { StorageService } from '@/services/storage/storage.service';

function logout() {
  StorageService.reset();
  location.href = '/login';
}
export default function UserPanel() {
  const t = useScopedI18n('personal_info');

  return (
    <div className='mx-auto mb-20 mt-12 w-[310px]'>
      <PersonalInfo />

      <Link href='/user/transactions'>
        <Button
          icon={<Calculator className='pointer-events-none mr-3 size-5' />}
          context={t('button.transaction_history')}
        />
      </Link>

      <Link href='/user/order-history'>
        <Button
          icon={<Calendar className='pointer-events-none mr-3 size-5' />}
          context={t('button.order_history')}
        />
      </Link>

      <Link href='/user/reserved-food'>
        <Button
          icon={<CalendarDays className='pointer-events-none mr-3 size-5' />}
          context={t('button.reservation_history')}
        />
      </Link>

      <Link href='/support'>
        <Button context={t('button.support')} className='bg-success-100 pr-4' />
      </Link>

      <Button
        onClick={logout}
        context={t('button.logout')}
        className='bg-error-100 pr-4'
      />
    </div>
  );
}
