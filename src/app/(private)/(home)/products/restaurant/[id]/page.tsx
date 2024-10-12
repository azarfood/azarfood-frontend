'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';

import FoodGrid from '@/components/(products)/food-grid/food-grid.component';
import Food from '@/components/food/food.component';
import Rate from '@/components/food/rate/rate.component';
import Heading from '@/components/heading/heading.component';
import { useScopedI18n } from '@/locales/client';
import { FoodService } from '@/services/food/food.service';
import { imageToUrl } from '@/utils/image-to-url';

export interface RestaurantDetailProps {
  params: {
    id: string;
  };
}
export default function RestaurantDetail(props: RestaurantDetailProps) {
  const st = useScopedI18n('restaurant_profile');
  const restaurantId = props.params.id;

  const { data: resData } = useSuspenseQuery({
    queryKey: ['/restaurant/', restaurantId],
    queryFn: () => FoodService.getRestaurant(restaurantId! ?? '-1'),
  });

  const { data: resFoodData } = useSuspenseQuery({
    queryKey: [`/restaurant/${restaurantId}/food`],
    queryFn: () => FoodService.getRestaurantFoods(restaurantId! ?? '-1'),
  });

  const foods = resFoodData.result.map((item) => (
    <Food props={item} key={item.id} />
  ));

  const rating = Number(resData.result.rating).toFixed(1);

  return (
    <main className='pb-8'>
      <Heading className='bg-primary-100'>{resData.result.name}</Heading>

      <div className='relative my-4 overflow-hidden rounded-lg'>
        <Image
          height={218}
          width={390}
          src={imageToUrl('Images/banner.png')}
          alt={resData.result.name}
          className='flex h-[218px] w-[390px] items-center justify-center object-contain object-cover'
        />
        <div className='absolute right-2 top-2 rounded bg-foreground-80 px-2 py-[1px]'>
          {rating && <Rate rate={rating} className='text-secondary-60' />}
        </div>
      </div>

      <hr className='rounded-full border-[1.5px] border-secondary-40'></hr>

      <p className='type-3-5r mr-2 mt-3 text-secondary-60'>
        {resData.result.address}
      </p>

      <section className='mt-5'>
        <div className='flex flex-row items-center text-center'>
          <Image
            height={32}
            width={40}
            src={imageToUrl('Images/logo.png')}
            alt={resData.result.name}
            className='h-8 w-10 object-contain'
          />
          <p className='type-4r mr-1 text-secondary-100'>{st('menu')}</p>
        </div>
        <FoodGrid foods={foods} />
      </section>
    </main>
  );
}
