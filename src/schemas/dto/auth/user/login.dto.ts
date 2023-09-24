import { z } from 'zod';

export const loginDTO = z.object({
	username: z.string().nonempty(),
	password: z.string().nonempty(),
});
