import type { ResponseDto } from '@/types/dto/response.dto';

import type { FoodDto } from './food.dto';

export type FoodSearchResponseDto = ResponseDto<FoodDto[]>;
