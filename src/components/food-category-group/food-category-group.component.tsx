import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import FoodCategory from '@/components/(home)/food-category/food-category.component';
import type { FoodCategory as FoodCategoryEnum } from '@/configs/constants/food-categories.constants';
import { foodCategories } from '@/configs/constants/food-categories.constants';
import { foodCategorySchema } from '@/schemas/food-category.schema';

export default function FoodCategoryGroup() {
  const [category, setCategory] = useState<FoodCategoryEnum | undefined>(
    undefined,
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const category = foodCategorySchema.safeParse(searchParams.get('category'));
    if (category.success) {
      setCategory(category.data);
    } else {
      setCategory(undefined);
    }
  }, [searchParams]);
  return (
    <div className='mb-4 mt-7 flex flex-row gap-5 overflow-y-hidden overflow-x-scroll p-1 pb-3'>
      {foodCategories.map((item) => (
        <FoodCategory
          image={item.image}
          category={item.category}
          key={item.category}
          isActive={category === item.category}
          onClick={(c) => {
            const params = new URLSearchParams(searchParams);
            params.set('category', c);
            router.push('/search-result?' + params.toString());
          }}
        />
      ))}
    </div>
  );
}
