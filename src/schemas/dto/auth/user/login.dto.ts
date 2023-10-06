import { z } from 'zod';

export const loginDTO = z.object({
	username: z.string().nonempty(),
	password: z.string().nonempty(),
});

export const loginResponseDTO = z.object({
	token_type: z.string(),
	'expires_in ': z.number(),
	access_token: z.string(),
});
