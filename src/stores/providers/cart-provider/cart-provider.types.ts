import type { FoodDto } from '@/services/food/dtos/food.dto';

export interface CartItem {
  food: FoodDto;
  count: number;
}

export interface ReceiptItem {
  products: CartItem[];
  date: string;
  delivery_time: string;
  delivery_location: string;
  id: string;
}
