import type { PaginationParams } from '@/types/dto/pagination.dto';

export interface FoodSearchParams extends PaginationParams {
  q?: string; // search text
  category?: string;
  collection?: string;
}
