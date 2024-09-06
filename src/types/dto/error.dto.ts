import { z } from 'zod';

export interface ErrorDto {
  success: false;
  code: string;
  message: string;
}

export const errorSchema = z.object({
  success: z.literal(false),
  code: z.string(),
  message: z.string(),
});
