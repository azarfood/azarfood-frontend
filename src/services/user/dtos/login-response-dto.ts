import type { ResponseDto } from '@/types/dto/response.dto';

import type { UserDto } from './user.dto';

export type LoginResponseDto = ResponseDto<{
  user: UserDto;
  token: string;
}>;
