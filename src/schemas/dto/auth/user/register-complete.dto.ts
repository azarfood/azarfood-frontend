import z from 'zod';

export const registerCompleteDTO = z.object({
	UserCode: z.string(),
	KeyCode: z.string(),
	KeyCheck: z.string(),
	name: z.string(),
	password: z.string(),
	phone_number: z.string(),
});
