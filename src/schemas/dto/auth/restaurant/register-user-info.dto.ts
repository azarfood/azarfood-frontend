import z from 'zod';

export const registerFinalInfoDTO = z.object({
	password: z.string(),
	type: z.string(),
	document: z.string(),
	owner_name: z.string(),
	owner_last_name: z.string(),
	owner_national_code: z.string(),
	address: z.string(),
	telephone: z.string(),
	postal_code: z.string(),
	owner_bank_account: z.string(),
	number_bank_account: z.string(),
	shaba_bank_account: z.string(),
	card_number: z.string(),
	phone_number: z.string(),
});
