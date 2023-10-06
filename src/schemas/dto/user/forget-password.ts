import { z } from 'zod';

export const forgetPasswordDTO = z
	.object({
		UserCode: z.string().nonempty(),
		KeyCode: z.string().nonempty(),
		new_password: z.string().nonempty(),
	})
	.transform(input =>
		Object.assign(input, {
			KeyCheck: '{{KeyCheck}}',
		}),
	);
