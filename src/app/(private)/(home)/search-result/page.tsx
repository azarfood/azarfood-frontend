'use client';

import SeeSearchResult from '@/components/(search-result)/see-search-result/see-search-result.component';
import FoodCategoryGroup from '@/components/food-category-group/food-category-group.component';
import Searchbar from '@/components/searchbar/searchbar.component';

export default function SearchResult() {
  return (
    <>
      <Searchbar />

      <FoodCategoryGroup />

      <SeeSearchResult />
    </>
  );
}

