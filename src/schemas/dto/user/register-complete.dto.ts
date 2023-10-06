import md5 from 'md5';
import z from 'zod';

export const registerCompleteDTO = z
	.object({
		UserCode: z.string(),
		KeyCode: z.string(),
		name: z.string(),
		password: z.string(),
		phone_number: z.string(),
	})
	.transform(input =>
		Object.assign(input, {
			KeyCheck: '{{KeyCheck}}',
			KeyCode: md5(input.KeyCode),
		}),
	);
