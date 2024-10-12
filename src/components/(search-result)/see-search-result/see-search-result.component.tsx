'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import FoodGrid from '@/components/(products)/food-grid/food-grid.component';
import RestaurantGrid from '@/components/(products)/restaurant-grid/restaurant-grid.component';
import Food from '@/components/food/food.component';
import Restaurant from '@/components/restaurant/restaurant.component';
import { useI18n } from '@/locales/client';
import { foodCategorySchema } from '@/schemas/food-category.schema';
import type { FoodSearchParams } from '@/services/food/dtos/food-search-params.dto';
import { FoodService } from '@/services/food/food.service';
import { cn } from '@/utils/cn';

export default function SeeSearchResult() {
  const t = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [params, setParams] = useState<FoodSearchParams>({});

  useEffect(() => {
    const newParams: FoodSearchParams = {};
    newParams.q = searchParams.get('search') ?? '';
    const category = foodCategorySchema.safeParse(searchParams.get('category'));
    if (category.success) {
      newParams.category = category.data;
    }

    setParams(newParams);
  }, [searchParams]);

  const [toShow, setToShow] = useState(searchParams.get('tab') ?? 'food');

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (toShow === 'restaurant') {
      params.set('tab', 'restaurant');
    } else {
      params.delete('tab');
    }
    router.replace(pathname + '?' + params.toString());
  }, [toShow, router, pathname, searchParams]);

  const { data: collectionFoods } = useSuspenseQuery({
    queryKey: ['/food', params],
    queryFn: () => FoodService.getFoodSearch(params),
  });

  const { data: collectionRestaurants } = useSuspenseQuery({
    queryKey: ['/restaurant', params],
    queryFn: () => FoodService.getRestaurantSearch(params),
  });

  const foods = collectionFoods.result.map((item) => (
    <Food props={item} key={item.id} />
  ));

  const restaurants = collectionRestaurants.result.map((item) => (
    <Restaurant
      id={item.id}
      name={item.name}
      image={item.image}
      rating={item.rating}
      key={item.id}
    />
  ));

  return (
    <section className='pb-8'>
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
    </section>
  );
}
