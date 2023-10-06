import md5 from 'md5';
import z from 'zod';

export const registerDTO = z
	.object({
		UserCode: z.string(),
		KeyCode: z.string(),
	})
	.transform(input =>
		Object.assign(input, {
			KeyCheck: '{{KeyCheck}}',
			KeyCode: md5(input.KeyCode),
		}),
	);

export const registerResponseDTO = z.object({
	massage: z.string(),
	UserCode: z.string(),
	KeyCode: z.string(),
	KeyCheck: z.string(),
});
