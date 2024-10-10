'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import AddIcon from '@/assets/icons/add.svg';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import StarIcon from '@/assets/icons/star.svg';
import { Button } from '@/components/button/button.component';
import { useScopedI18n } from '@/locales/client';
import { FoodService } from '@/services/food/food.service';
import { priceFormatter } from '@/utils/price-formatter';

export interface FoodDetailPageProps {
  params: {
    id: string;
  };
}
export default function FoodDetailPage(props: FoodDetailPageProps) {
  const st = useScopedI18n('food_detail');
  const router = useRouter();
  const foodId = props.params.id;
  const { data } = useSuspenseQuery({
    queryKey: ['/food', foodId],
    queryFn: () => FoodService.getFood(foodId! ?? '-1'),
  });
  const food = data.result;
  return (
    <main className='text-secondary-100'>
      <div className='type-sb mt-4 flex items-center rounded-lg bg-primary-100 text-foreground-100'>
        <span className='px-3'>{st('food_detail')}</span>
        <Button
          className='dark mr-auto bg-transparent shadow-none'
          onClick={router.back}
        >
          <ArrowLeftIcon />
        </Button>
      </div>
      <section className='mt-8 flex flex-col'>
        <header className='flex justify-between'>
          <div>
            <h1 className='type-6r text-secondary-100'>{food.name}</h1>
            <p className='type-3r text-secondary-60'>{food.restaurant.name}</p>
            <p className='type-3r flex items-center gap-1 text-secondary-60'>
              <StarIcon />
              <span>{(+food.rating).toFixed(1)}</span>
            </p>
          </div>
          <div className='flex items-start'>
            <button className='type-4r flex items-center gap-1 text-secondary-100'>
              <div className='flex size-6 items-center justify-center rounded-full bg-success-100'>
                <AddIcon />
              </div>
              <span>{st('add_to_cart')}</span>
            </button>
          </div>
        </header>
        <figure className='relative mx-auto -mt-6 aspect-square w-full max-w-[288px] rounded-full bg-secondary-20'>
          <Image
            src={food.image_url}
            alt={food.name}
            fill
            className='flex items-center justify-center'
          />
        </figure>
        <div className='type-3r mt-5'>
          {st('price')} {priceFormatter.format(+food.price)} {st('unit_toman')}
        </div>

        <div className='type-3r mt-4 w-full rounded-lg px-[10px] py-2 shadow shadow-primary-20'>
          <h2 className='border-b border-b-primary-80 pb-2'>
            {st('ingredients')}
          </h2>
          <p className='pt-4 text-secondary-60'>{food.description}</p>
        </div>
      </section>
    </main>
  );
}
