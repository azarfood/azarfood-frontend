import { ReverseAuthGuard } from '@/store/providers/reverse-auth-guard';
import type { PropsWithChildren } from 'react';

export default function PublicOnlyLayout({ children }: PropsWithChildren) {
	return <ReverseAuthGuard>{children}</ReverseAuthGuard>;
}
