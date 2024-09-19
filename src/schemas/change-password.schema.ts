import { z } from 'zod';

import { translationKey } from '@/locales/check-key';

export const changePasswordSchema = z
  .object({
    old_password: z
      .string()
      .min(1, translationKey('reset_password.errors.password_empty'))
      .min(8, translationKey('reset_password.errors.password_min'))
      .max(20, translationKey('reset_password.errors.password_max')),
    new_password: z
      .string()
      .min(1, translationKey('auth.errors.password_empty'))
      .min(8, translationKey('reset_password.errors.password_min'))
      .max(20, translationKey('reset_password.errors.password_max')),
    confirmation: z
      .string()
      .min(1, translationKey('auth.errors.password_empty'))
  })
  .refine((data) => data.new_password === data.confirmation, {
    message: translationKey('reset_password.errors.confirmation'),
    path: ['confirmation'],
  });
