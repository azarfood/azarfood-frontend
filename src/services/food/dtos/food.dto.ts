import type { RestaurantDto } from './restaurant.dto';

export interface FoodDto {
  id: string;
  name: string;
  rating: number;
  image: string;
  price: number;
  restaurant: RestaurantDto;
  ingredients: string;
  discount?: number;
}
