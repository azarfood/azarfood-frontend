import './user.mock';

import { HttpService } from '../http/http.service';
import type { LoginResponseDto } from './dtos/login-response-dto';
import type { MeResponseDto } from './dtos/me-response-dto';
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
}
