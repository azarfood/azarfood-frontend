import type { ResponseDto } from '@/types/dto/response.dto';

import type { Transaction } from '../entities/transaction';

export type TransactionHistoryResponseDto = ResponseDto<Transaction[]>;
