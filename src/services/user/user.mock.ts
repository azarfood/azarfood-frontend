import { httpMock } from '@/services/http/http.mock';
import type { ErrorDto } from '@/types/dto/error.dto';
import type { ResponseDto } from '@/types/dto/response.dto';

import type { ChangePasswordResponseDto } from './dtos/change-password-response.dto';
import type { LoginResponseDto } from './dtos/login-response-dto';
import type { MeResponseDto } from './dtos/me-response-dto';
import type { OrderHistoryResponseDto } from './dtos/order-history-response.dto';
import type { TransactionHistoryResponseDto } from './dtos/transaction-history-response.dto';
import type { UserBalanceDto } from './dtos/user-balance.dto';
import { orderHistoryMock } from './order-history.mock';
import { orderListMock } from './order-list.mock';
import { transactionMock } from './transaction.mock';

const loginResponse: LoginResponseDto = {
  success: true,
  result: {
    user: {
      id: '1',
      first_name: 'رضا',
      last_name: 'رشیدی',
      student_code: '4001802020',
      national_code: '1431772839',
    },
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Itix2LbYpyDYsdi024zYr9uMIiwiaWF0IjoxNTE2MjM5MDIyfQ._9tiJUXI5UCwIEfOfIK3axW5ku826S94cLjGEdrve04',
  },
};

const meResponse: MeResponseDto = {
  success: true,
  result: {
    id: '1',
    first_name: 'رضا',
    last_name: 'رشیدی',
    student_code: '4001802020',
    national_code: '1431772839',
  },
};

const changePasswordResponse: ChangePasswordResponseDto = {
  success: true,
  result: undefined,
  message: 'رمز عبور با موفقیت تغییر پیدا کرد',
};

const orderHistoryResponse: OrderHistoryResponseDto = {
  success: true,
  result: orderHistoryMock,
};
const orderListResponse: OrderHistoryResponseDto = {
  success: true,
  result: orderListMock,
};

httpMock
  .onPost('/login', {
    username: loginResponse.result.user.student_code,
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
      return headers.Authorization === loginResponse.result.token;
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
  .onPost('/user/change-password', {
    old_password: meResponse.result.national_code,
    new_password: '11111111',
  })
  .reply(200, changePasswordResponse);

httpMock
  .onGet('/user/order/history', privateRouteOptions)
  .reply(200, orderHistoryResponse);

httpMock
  .onGet('/user/order/list', privateRouteOptions)
  .reply(200, orderListResponse);

httpMock
  .onGet('/*', {
    headers: {
      asymmetricMatch: (headers: Record<string, string>) => {
        return headers.Authorization !== loginResponse.result.token;
      },
    },
  })
  .reply(401, {
    code: '401',
    message: 'نشست منقضی شده و یا اطلاعات نامعتبر',
    success: false,
  } satisfies ErrorDto);
