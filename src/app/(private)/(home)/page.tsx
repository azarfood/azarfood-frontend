'use client';

import Slider from '@/components/(home)/ads-slider/ads-slider.component';
import Collecttion from '@/components/(home)/collection/collection.component';
import FoodCategoryGroup from '@/components/food-category-group/food-category-group.component';
import Searchbar from '@/components/searchbar/searchbar.component';

export default function Home() {
  return (
    <>
      <Searchbar />

      <FoodCategoryGroup />

      <Slider />

      <Collecttion />
    </>
  );
}
