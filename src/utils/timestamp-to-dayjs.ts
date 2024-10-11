import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export function timestampToDayjs(timestamp: string): Dayjs;
export function timestampToDayjs(timestamp?: string) {
  if (timestamp == null) {
    return;
  }

  return dayjs(+timestamp * 1000);
}
