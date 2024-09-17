import './user.mock';

import type { ResponseDto } from '@/types/dto/response.dto';

import { HttpService } from '../http/http.service';
import type { ChangePasswordDto } from './dtos/change-password.dto';
import type { ChangePasswordResponseDto } from './dtos/change-password-response.dto';
import type { LoginResponseDto } from './dtos/login-response-dto';
import type { MeResponseDto } from './dtos/me-response-dto';
import type { TransactionHistoryResponseDto } from './dtos/transaction-history-response.dto';
import type { UserBalanceDto } from './dtos/user-balance.dto';
import type { UserLoginDto } from './dtos/user-login.dto';

export class UserService {
  public static async login(dto: UserLoginDto): Promise<LoginResponseDto> {
    const response = await HttpService.post<LoginResponseDto>('/login', dto);
    return response.data;
  }

  public static async getMe(): Promise<MeResponseDto> {
    const response = await HttpService.get<MeResponseDto>('/user/me');
    return response.data;
  }

  public static async getTransactionHistory(): Promise<TransactionHistoryResponseDto> {
    const response = await HttpService.get<TransactionHistoryResponseDto>(
      '/user/transaction-history',
    );
    return response.data;
  }

  public static async getBalance(): Promise<ResponseDto<UserBalanceDto>> {
    const response =
      await HttpService.get<ResponseDto<UserBalanceDto>>('/user/balance');
    return response.data;
  }

  public static async changePassword(
    dto: ChangePasswordDto,
  ): Promise<ChangePasswordResponseDto> {
    const response = await HttpService.post<ChangePasswordResponseDto>(
      '/user/change-password',
      dto,
    );
    return response.data;
  }
}
