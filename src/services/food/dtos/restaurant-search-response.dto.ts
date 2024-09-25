import type { ResponseDto } from '@/types/dto/response.dto';

import type { RestaurantResponseDto } from './restaurant-response.dto';

export type RestaurantSearchResponseDto = ResponseDto<RestaurantResponseDto[]>;
