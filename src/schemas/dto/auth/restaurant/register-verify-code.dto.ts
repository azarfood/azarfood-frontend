import z from 'zod';

export const registerVerifyCodeDTO = z.object({
	code: z.string(),
	phone_number: z.string(),
});
