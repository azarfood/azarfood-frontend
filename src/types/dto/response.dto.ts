export interface ResponseDto<T> {
  success: true;
  result: T;
  message?: string;
}
