'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import FoodGrid from '@/components/(products)/food-grid/food-grid.component';
import RestaurantGrid from '@/components/(products)/restaurant-grid/restaurant-grid.component';
import FoodCategoryGroup from '@/components/food-category-group/food-category-group.component';
import Heading from '@/components/heading/heading.component';
import { useI18n } from '@/locales/client';
import { cn } from '@/utils/cn';

export default function SeeAll() {
  const t = useI18n();
  const pathname = usePathname();
  const pageHeading = pathname.split('/').pop()?.toString();

  const [toShow, setToShow] = useState('food');

  return (
    <>
      <Heading className='bg-primary-100'>
        {t(`collection.${pageHeading}`)}
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

      {toShow === 'food' ? <FoodGrid /> : <RestaurantGrid />}
    </>
  );
}
