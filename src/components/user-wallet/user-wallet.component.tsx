'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import CreditCardIcon from '@/assets/icons/credit-card.svg';
import { useScopedI18n } from '@/locales/client';
import { UserService } from '@/services/user/user.service';
import { priceFormatter } from '@/utils/price-formatter';

import { Button } from '../button/button.component';

export function UserWallet() {
  const { isPending, isError, data } = useQuery({
    queryKey: ['/user/balance'],
    queryFn: UserService.getBalance,
  });
  const t = useScopedI18n('transaction_history');
  const router = useRouter();

  return (
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
          {isPending && <div className='animate-pulse'>-</div>}
          {isError && <div className='text-error-100'>error!</div>}
          {!isPending && !isError && (
            <>
              {priceFormatter.format(data.result.balance)} {t('currency_toman')}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
