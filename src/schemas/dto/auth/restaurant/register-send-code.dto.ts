import z from 'zod';

export const registerSendCodeDTO = z.object({
	name: z.string(),
	phone_number: z.string(),
});
