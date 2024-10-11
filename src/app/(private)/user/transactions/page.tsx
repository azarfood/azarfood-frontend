'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import type { Dispatch, SetStateAction } from 'react';
import { useMemo, useState } from 'react';

import CalendarIcon from '@/assets/icons/calendar.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import { Button } from '@/components/button/button.component';
import { ButtonGroup } from '@/components/button-group/button-group.component';
import { DateRangePicker } from '@/components/date-range-picker/date-range-picker.component';
import { UserWallet } from '@/components/user-wallet/user-wallet.component';
import { useScopedI18n } from '@/locales/client';
import type { Transaction } from '@/services/user/entities/transaction';
import { UserService } from '@/services/user/user.service';
import { priceFormatter } from '@/utils/price-formatter';
import { timestampToDayjs } from '@/utils/timestamp-to-dayjs';

interface TransactionRowProps {
  transaction: Transaction;
}
function TransactionRow({ transaction }: TransactionRowProps) {
  const date = timestampToDayjs(transaction.date);
  return (
    <tr
      key={transaction.id}
      className='type-control-label h-8 border-b border-solid border-b-secondary-5 text-secondary-80'
    >
      <td>{date.format('YYYY/MM/DD')}</td>
      <td>{date.format('HH:mm')}</td>
      <td
        className='text-success-100 data-[type=debit]:text-error-100'
        data-type={transaction.type}
      >
        {priceFormatter.format(+transaction.amount)}
      </td>
    </tr>
  );
}

const today = dayjs().startOf('day');
const prevWeek = today.subtract(1, 'week');

function isDateRangeThisWeek(from?: Date, to?: Date): boolean {
  if (from == null || to == null) {
    return false;
  }
  return dayjs(from).isSame(prevWeek, 'day') && dayjs(to).isSame(today, 'day');
}

interface TransactionFilters {
  dateFrom?: Date;
  dateTo?: Date;
}
interface TransactionHistoryFiltersProps {
  filters: TransactionFilters;
  setFilters: Dispatch<SetStateAction<TransactionFilters>>;
}
function TransactionHistoryFilters({
  filters,
  setFilters,
}: TransactionHistoryFiltersProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const t = useScopedI18n('transaction_history');

  const isDateAll = filters.dateTo == null && filters.dateFrom == null;
  const isDateThisWeek = useMemo(
    () => isDateRangeThisWeek(filters.dateFrom, filters.dateTo),
    [filters],
  );
  const isDateCustom = !isDateThisWeek && !isDateAll;

  return (
    <>
      <ButtonGroup
        items={[
          {
            onClick: () =>
              setFilters((prev) => ({
                ...prev,
                dateFrom: undefined,
                dateTo: undefined,
              })),
            children: t('filter_date.all'),
            isActive: isDateAll,
          },
          {
            onClick: () =>
              setFilters((prev) => ({
                ...prev,
                dateFrom: prevWeek.toDate(),
                dateTo: today.toDate(),
              })),
            children: t('filter_date.this_week'),
            isActive: isDateThisWeek,
          },
          {
            onClick: () => setShowDatePicker((prev) => !prev),

            children: (
              <div className='relative z-10 flex w-full items-center justify-center gap-2'>
                {t('filter_date.specific_date')}{' '}
                <CalendarIcon className='size-3' />
              </div>
            ),
            isActive: isDateCustom,
          },
        ]}
      />
      <DateRangePicker
        onChange={({ to, from }) => {
          setFilters((prev) => ({ ...prev, dateTo: to, dateFrom: from }));
        }}
        show={showDatePicker}
        onClose={() => setShowDatePicker(false)}
      />
    </>
  );
}

export default function TransactionsPage() {
  const t = useScopedI18n('transaction_history');
  const { data } = useSuspenseQuery({
    queryKey: ['/user/transaction-history'],
    queryFn: UserService.getTransactionHistory,
  });
  const [filters, setFilters] = useState<TransactionFilters>({});
  return (
    <>
      <UserWallet />

      <div className='mt-5 flex'>
        <TransactionHistoryFilters filters={filters} setFilters={setFilters} />
        <Button className='dark type-control mr-auto min-h-6 rounded bg-secondary-100 px-2'>
          <div className='flex w-full items-center justify-center gap-1'>
            <PlusIcon className='size-3' />
            {t('increase_balance')}
          </div>
        </Button>
      </div>

      <div className='relative mb-5 mt-5 w-full rounded-lg bg-secondary-5 px-2'>
        <div className='absolute left-0 right-0 top-10 h-0.5 -translate-y-full bg-secondary-40'></div>
        <table className='w-full px-40 text-center'>
          <thead>
            <tr className='border-b-secondary-10 h-10'>
              <td>{t('date')}</td>
              <td>{t('time')}</td>
              <td>{t('price')}</td>
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
