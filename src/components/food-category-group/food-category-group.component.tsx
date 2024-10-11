import FoodCategory from '@/components/(home)/food-category/food-category.component';
import { foodCategories } from '@/configs/constants/food-categories.constants';

export default function FoodCategoryGroup() {
  return (
    <div className='mb-4 mt-7 flex flex-row gap-5 overflow-y-hidden overflow-x-scroll p-1 pb-3'>
      {foodCategories.map((item) => (
        <FoodCategory image={item.image} category={item.category} key='' />
      ))}
    </div>
  );
}
