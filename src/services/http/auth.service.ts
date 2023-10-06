import axios from 'axios';
import type { loginDTO } from '@/schemas/dto/auth/restaurant/login.dto';
import type { loginResponseDTO } from '@/schemas/dto/auth/user/login.dto';
import type { registerCompleteDTO } from '@/schemas/dto/auth/user/register-complete.dto';
import type {
	registerDTO,
	registerResponseDTO,
} from '@/schemas/dto/auth/user/register.dto';
import type { z } from 'zod';

export class AuthService {
	public login = (dto: z.infer<typeof loginDTO>) =>
		axios.post<z.infer<typeof loginResponseDTO>>(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`,
			dto,
		);
	public register = (dto: z.infer<typeof registerDTO>) =>
		axios.post<z.infer<typeof registerResponseDTO>>(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/register`,
			dto,
		);
	public registerComplete = (dto: z.infer<typeof registerCompleteDTO>) =>
		axios.post<z.infer<typeof registerResponseDTO>>(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/register_complete`,
			dto,
		);
}
