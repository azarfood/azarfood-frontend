import type { StaticImageData } from 'next/image';
import Image from 'next/image';

import type { FoodCategory as FoodCategoryEnum } from '@/configs/constants/food-categories.constants';
import { useScopedI18n } from '@/locales/client';

export interface FoodCategoryProps {
  image: StaticImageData;
  category: FoodCategoryEnum;
}

export default function FoodCategory({ image, category }: FoodCategoryProps) {
  const t = useScopedI18n('food_categories');

  function handleClick(category: string) {
    void category;
  }

  return (
    <button
      className='group w-[60px] text-center'
      onClick={() => handleClick(category)}
    >
      <div className='flex size-[60px] items-center justify-center rounded-full bg-primary-20 p-3 shadow-simple-01 transition hover:shadow-md active:bg-primary-60 active:shadow-simple-01 group-active:bg-primary-60'>
        <Image
          src={image}
          alt='i'
          width={40}
          height={40}
          className='object-contain'
        />
      </div>
      <p className='type-3r mt-2 text-secondary-100'>{t(category)}</p>
    </button>
  );
}
