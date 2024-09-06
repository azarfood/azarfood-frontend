'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import CreditCardIcon from '@/assets/icons/credit-card.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import SpinnerIcon from '@/assets/icons/spinner.svg';
import { Button } from '@/components/button/button.component';
import { useScopedI18n } from '@/locales/client';
import { UserService } from '@/services/user/user.service';

export default function TransactionsPage() {
  const t = useScopedI18n('transaction_history');
  const router = useRouter();
  const { data, isPending, isError } = useQuery({
    queryKey: ['/user/transaction-history'],
    queryFn: UserService.getTransactionHistory,
  });

  if (isPending || isError) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <SpinnerIcon className='mx-auto animate-spin fill-secondary-100' />
      </div>
    );
  }

  return (
    <>
      <div className='mt-6 flex h-32 w-full flex-col overflow-hidden rounded-lg bg-secondary-5 shadow'>
        <h1 className='type-h2 flex h-11 w-full items-center bg-secondary-100 pr-4 text-foreground-100'>
          {t('wallet')}
          <Button className='dark mr-auto bg-transparent' onClick={router.back}>
            <ArrowLeftIcon />
          </Button>
        </h1>

        <div className='flex flex-1 flex-col px-5 pb-4 pt-3'>
          <div className='flex items-center gap-1'>
            <CreditCardIcon /> {t('balance')}:
          </div>

          <div className='mr-auto mt-auto'>
            {100000} {t('currency_toman')}
          </div>
        </div>
      </div>

      <div className='mt-5 flex'>
        <Button className='dark type-control mr-auto min-h-6 rounded bg-secondary-100 px-2'>
          <div className='flex w-full items-center justify-center gap-1'>
            <PlusIcon className='size-3' />
            {t('increase_balance')}{' '}
          </div>
        </Button>
      </div>
      <div className='relative mx-auto mb-5 mt-5 w-fit rounded-lg bg-secondary-5 px-2'>
        <div className='absolute left-0 right-0 top-10 h-0.5 -translate-y-full bg-secondary-40'></div>
        <table className='px-40 text-center'>
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
              <tr
                key={transaction.id}
                className='h-8 border-b border-solid border-b-secondary-5'
              >
                <td>{transaction.date}</td>
                <td>{transaction.date}</td>
                <td>
                  {+transaction.balance +
                    +transaction.value *
                      (transaction.type === 'credit' ? 1 : -1)}
                </td>
                <td
                  className='text-success-100 data-[type=debit]:text-error-100'
                  data-type={transaction.type}
                >
                  {transaction.value}
                </td>
                <td>{transaction.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
