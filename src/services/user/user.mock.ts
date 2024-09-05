import type { LoginResponseDto } from './dtos/login-response-dto';
import type { MeResponseDto } from './dtos/me-response-dto';

export const loginResponse: LoginResponseDto = {
  success: true,
  data: {
    user: {
      id: '1',
      first_name: 'رضا',
      last_name: 'رشیدی',
      student_id: '4001802020',
      national_code: '1431772839',
    },
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Itix2LbYpyDYsdi024zYr9uMIiwiaWF0IjoxNTE2MjM5MDIyfQ._9tiJUXI5UCwIEfOfIK3axW5ku826S94cLjGEdrve04',
  },
};
export const meResponse: MeResponseDto = {
  success: true,
  data: {
    id: '1',
    first_name: 'رضا',
    last_name: 'رشیدی',
    student_id: '4001802020',
    national_code: '1431772839',
  },
};
