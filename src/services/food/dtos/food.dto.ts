import type { RestaurantDto } from './restaurant.dto';

export interface FoodDto {
  id: string;
  name: string;
  rating: string;
  image: string;
  price: string;
  restaurant: RestaurantDto;
  ingredients: string;
  discount?: number;
}
