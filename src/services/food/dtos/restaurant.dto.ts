export interface RestaurantDto {
  id: string;
  name: string;
  rating?: string;
  image: string;
  banner_url?: string | null;
  address: string;
}
