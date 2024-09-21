'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import { FoodTable } from '@/components/(food-history)/food-table/food-table.component';
import { Button } from '@/components/button/button.component';
import { useScopedI18n } from '@/locales/client';
import { UserService } from '@/services/user/user.service';

export default function ReservedFoodPage() {
  const { data } = useSuspenseQuery({
    queryKey: ['/user/order/list'],
    queryFn: UserService.getOrderList,
  });
  const t = useScopedI18n('order_history');
  const router = useRouter();

  return (
    <main>
      <div className='type-sb mt-4 flex items-center rounded-lg bg-primary-100 text-foreground-100'>
        <span className='px-3'>{t('heading_reserverd_food')}</span>
        <Button
          className='dark mr-auto bg-transparent shadow-none'
          onClick={router.back}
        >
          <ArrowLeftIcon />
        </Button>
      </div>
      <FoodTable className='mt-5' orders={data.result} />
    </main>
  );
}
