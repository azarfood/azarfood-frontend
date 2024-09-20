import type { ResponseDto } from '@/types/dto/response.dto';

import type { OrderHistoryDto } from './order-history.dto';

export type OrderHistoryResponseDto = ResponseDto<OrderHistoryDto[]>;
