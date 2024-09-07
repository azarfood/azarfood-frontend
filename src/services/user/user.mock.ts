import { httpMock } from '@/services/http/http.mock';
import type { ErrorDto } from '@/types/dto/error.dto';

import type { LoginResponseDto } from './dtos/login-response-dto';
import type { MeResponseDto } from './dtos/me-response-dto';
import type { TransactionHistoryResponseDto } from './dtos/transaction-history-response.dto';
import { transactionMock } from './transaction.mock';
import { ResponseDto } from '@/types/dto/response.dto';
import { UserBalanceDto } from './dtos/user-balance.dto';

const loginResponse: LoginResponseDto = {
  success: true,
  result: {
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

const meResponse: MeResponseDto = {
  success: true,
  result: {
    id: '1',
    first_name: 'رضا',
    last_name: 'رشیدی',
    student_id: '4001802020',
    national_code: '1431772839',
  },
};

httpMock
  .onPost('/login', {
    username: loginResponse.result.user.student_id,
    password: loginResponse.result.user.national_code,
  })
  .reply(200, loginResponse);
httpMock.onPost('/login').reply(400, {
  code: '401',
  message: 'نام کاربری یا رمز عبور اشتباه میباشد',
  success: false,
} satisfies ErrorDto);

const privateRouteOptions = {
  headers: {
    asymmetricMatch: (headers: Record<string, string>) => {
      return headers.Authorization === loginResponse.result.access_token;
    },
  },
};

httpMock.onGet('/user/me', privateRouteOptions).reply(200, meResponse);

const transactionHistoryResponse: TransactionHistoryResponseDto = {
  success: true,
  result: transactionMock,
};

httpMock
  .onGet('/user/transaction-history', privateRouteOptions)
  .reply(200, transactionHistoryResponse);

const balanceResponse: ResponseDto<UserBalanceDto> = {
  success: true,
  result: {
    balance: 100000,
  },
};

httpMock
  .onGet('/user/balance', privateRouteOptions)
  .reply(200, balanceResponse);

httpMock
  .onGet('/*', {
    headers: {
      asymmetricMatch: (headers: Record<string, string>) => {
        return headers.Authorization !== loginResponse.result.access_token;
      },
    },
  })
  .reply(401, {
    code: '401',
    message: 'نشست منقضی شده و یا اطلاعات نامعتبر',
    success: false,
  } satisfies ErrorDto);
