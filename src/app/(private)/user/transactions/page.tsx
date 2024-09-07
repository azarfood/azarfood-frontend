'use client';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';

import CalendarIcon from '@/assets/icons/calendar.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import SpinnerIcon from '@/assets/icons/spinner.svg';
import { Button } from '@/components/button/button.component';
import { DateRangePicker } from '@/components/date-range-picker/date-range-picker.component';
import { UserWallet } from '@/components/user-wallet/user-wallet.component';
import { useScopedI18n } from '@/locales/client';
import type { Transaction } from '@/services/user/entities/transaction';
import { UserService } from '@/services/user/user.service';
import { priceFormatter } from '@/utils/price-formatter';

interface TransactionRowProps {
  transaction: Transaction;
}
function TransactionRow({ transaction }: TransactionRowProps) {
  const oldBalance =
    +transaction.balance +
    +transaction.value * (transaction.type === 'credit' ? -1 : 1);
  const date = dayjs(transaction.date);
  return (
    <tr
      key={transaction.id}
      className='type-control-label h-8 border-b border-solid border-b-secondary-5 text-secondary-80'
    >
      <td>{date.format('YYYY/MM/DD')}</td>
      <td>{date.format('HH:mm')}</td>
      <td>{priceFormatter.format(oldBalance)}</td>
      <td
        className='text-success-100 data-[type=debit]:text-error-100'
        data-type={transaction.type}
      >
        {priceFormatter.format(+transaction.value)}
      </td>
      <td>{priceFormatter.format(+transaction.balance)}</td>
    </tr>
  );
}

export default function TransactionsPage() {
  const t = useScopedI18n('transaction_history');
  const { data, isPending, isError } = useQuery({
    queryKey: ['/user/transaction-history'],
    queryFn: UserService.getTransactionHistory,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  if (isPending || isError) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <SpinnerIcon className='mx-auto animate-spin fill-secondary-100' />
      </div>
    );
  }

  return (
    <>
      <UserWallet />
      <div className='mt-5 flex'>
        <Button
          className='dark type-control min-h-6 rounded bg-secondary-100 px-2'
          onClick={() => setShowDatePicker((prev) => !prev)}
        >
          <div className='flex w-full items-center justify-center gap-2'>
            {t('filter_date.specific_date')} <CalendarIcon className='size-3' />
          </div>
        </Button>
        <Button className='dark type-control mr-auto min-h-6 rounded bg-secondary-100 px-2'>
          <div className='flex w-full items-center justify-center gap-1'>
            <PlusIcon className='size-3' />
            {t('increase_balance')}{' '}
          </div>
        </Button>
      </div>

      <DateRangePicker
        show={showDatePicker}
        onClose={() => setShowDatePicker(false)}
      />
      <div className='relative mb-5 mt-5 w-full rounded-lg bg-secondary-5 px-2'>
        <div className='absolute left-0 right-0 top-10 h-0.5 -translate-y-full bg-secondary-40'></div>
        <table className='w-full px-40 text-center'>
          <thead>
            <tr className='border-b-secondary-10 h-10'>
              <td>{t('date')}</td>
              <td>{t('time')}</td>
              <td>{t('balance')}</td>
              <td>{t('price')}</td>
              <td>{t('remaining')}</td>
            </tr>
          </thead>
          <tbody>
            {data.result.map((transaction) => (
              <TransactionRow transaction={transaction} key={transaction.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
