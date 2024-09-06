import { StorageService } from '../storage/storage.service';
import type { LoginResponseDto } from './dtos/login-response-dto';
import type { MeResponseDto } from './dtos/me-response-dto';
import type { UserLoginDto } from './dtos/user-login.dto';
import { loginResponse, meResponse } from './user.mock';

export class UserService {
  public static async login(dto: UserLoginDto): Promise<LoginResponseDto> {
    const {
      data: { user },
    } = loginResponse;
    await new Promise((res) => setTimeout(res, 1000));
    if (
      dto.password === user.national_code &&
      dto.username === user.student_id
    ) {
      return loginResponse;
    }

    const error = {
      success: false,
      message: 'نام کاربری یا رمز عبور اشتباه میباشد',
      code: '401',
    };
    throw new Error(error.message);
  }
  public static async getMe(): Promise<MeResponseDto> {
    const token = StorageService.user_token.get();
    await new Promise((res) => setTimeout(res, 1000));
    if (token === loginResponse.data.access_token) {
      return meResponse;
    }
    StorageService.reset();
    location.href = '/login';
    const error = {
      success: false,
      message: 'نشست شما منقضی شده. لطفا دوباره وارد شوید',
      code: '401',
    };

    throw new Error(error.message);
  }
}
