import type { PropsWithChildren } from 'react';

import { AuthGuard } from '@/stores/providers/auth-guard';

export default function PrivateLayout({ children }: PropsWithChildren) {
  return <AuthGuard>{children}</AuthGuard>;
}
