import type { ResponseDto } from '@/types/dto/response.dto';

import type { RestaurantDto } from './restaurant.dto';

export type RestaurantResponseDto = ResponseDto<RestaurantDto>;