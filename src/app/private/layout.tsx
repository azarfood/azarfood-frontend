import { AuthGuard } from '@/store/providers/auth-guard';
import type { PropsWithChildren } from 'react';

export default function PrivatePageLayout({ children }: PropsWithChildren) {
	return <AuthGuard>{children}</AuthGuard>;
}
