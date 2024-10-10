import type { RestaurantDto } from './restaurant.dto';

export interface FoodDto {
  id: string;
  image_url: string;
  name: string;
  rating: string;
  price: string;
  restaurant: RestaurantDto;
  description: string;
  discount?: number;
}
