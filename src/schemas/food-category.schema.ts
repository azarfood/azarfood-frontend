import { z } from 'zod';

import { FoodCategory } from '@/configs/constants/food-categories.constants';

export const foodCategorySchema = z.nativeEnum(FoodCategory);
