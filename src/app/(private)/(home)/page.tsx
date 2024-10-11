'use client';

import Slider from '@/components/(home)/ads-slider/ads-slider.component';
import Collecttion from '@/components/(home)/collection/collection.component';
import FoodCategory from '@/components/(home)/food-category/food-category.component';
import Searchbar from '@/components/searchbar/searchbar.component';
import { foodCategories } from '@/configs/constants/food-categories.constants';

export default function Home() {
  return (
    <>
      <Searchbar />

      <div className='mb-4 mt-7 flex flex-row gap-5 overflow-y-hidden overflow-x-scroll p-1 pb-3'>
        {foodCategories.map((item) => (
          <FoodCategory image={item.image} category={item.category} key='' />
        ))}
      </div>

      <Slider />

      <Collecttion />
    </>
  );
}
