'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import FoodGrid from '@/components/(products)/food-grid/food-grid.component';
import RestaurantGrid from '@/components/(products)/restaurant-grid/restaurant-grid.component';
import Food from '@/components/food/food.component';
import FoodCategoryGroup from '@/components/food-category-group/food-category-group.component';
import Heading from '@/components/heading/heading.component';
import Restaurant from '@/components/restaurant/restaurant.component';
import { useUnsafeI18n } from '@/locales/check-key';
import { useI18n } from '@/locales/client';
import { FoodService } from '@/services/food/food.service';
import { cn } from '@/utils/cn';

interface SeeAllProps {
  params: {
    collection: string;
  };
}
export default function SeeAll(props: SeeAllProps) {
  const t = useI18n();
  const ut = useUnsafeI18n();
  const pathname = usePathname();
  const pageHeading = pathname.split('/').pop()?.toString();
  const collection = props.params.collection;

  const [toShow, setToShow] = useState('food');

  const { data: collectionFoods } = useSuspenseQuery({
    queryKey: ['/food', collection],
    queryFn: () =>
      FoodService.getFoodSearch({
        collection: collection,
        page: 2,
        per_page: 5,
      }),
  });

  const { data: collectionRestaurants } = useSuspenseQuery({
    queryKey: ['/restaurant', collection],
    queryFn: () =>
      FoodService.getFoodSearch({
        collection: collection,
        page: 2,
        per_page: 5,
      }),
  });

  const foods = collectionFoods.result.map((item) => (
    <Food props={item} key={item.id} />
  ));

  const restaurants = collectionRestaurants.result.map((item) => (
    <Restaurant
      id={item.id}
      name={item.name}
      image={item.image}
      key={item.id}
    />
  ));

  return (
    <>
      <Heading className='bg-primary-100'>
        {ut(`collection.${pageHeading}`)}
      </Heading>

      <FoodCategoryGroup />

      <div className='flex flex-row gap-2 px-2'>
        <button
          className={cn(
            '[toShow=food]:text-secondary-100 type-4sb bg-foreground-100 p-0 text-secondary-40 shadow-none active:text-secondary-100',
            { 'text-secondary-100': toShow === 'food' },
          )}
          onClick={() => setToShow('food')}
        >
          {t('general.food')}
        </button>

        <button
          className={cn(
            '[toShow=food]:text-secondary-100 type-4sb bg-foreground-100 p-0 text-secondary-40 shadow-none active:text-secondary-100',
            { 'text-secondary-100': toShow === 'restaurant' },
          )}
          onClick={() => setToShow('restaurant')}
        >
          {t('general.restaurant')}
        </button>
      </div>

      {toShow === 'food' ? (
        <FoodGrid foods={foods} />
      ) : (
        <RestaurantGrid restaurants={restaurants} />
      )}
    </>
  );
}
