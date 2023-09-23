import z from 'zod';

export const registerDTO = z.object({
	UserCode: z.string(),
	KeyCode: z.string(),
	KeyCheck: z.string(),
});
