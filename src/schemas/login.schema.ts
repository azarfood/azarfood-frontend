import { z } from 'zod';

import { translationKey } from '@/locales/check-key';

export const loginSchema = z.object({
  username: z.string().min(1, translationKey('auth.errors.username_empty')),
  password: z.string().min(1, translationKey('auth.errors.password_empty')),
});
