import type { RestaurantDto } from './restaurant.dto';

export interface FoodDto {
  id: string;
  image_url: string;
  name: string;
  rating: number;
  price: number;
  restaurant: RestaurantDto;
  ingredients: string;
  discount?: number;
}
