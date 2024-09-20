import type { PropsWithChildren } from 'react';

import { MainLayout } from '@/components/main-layout/main-layout.component';
import { AuthGuard } from '@/stores/providers/auth-provider/auth-guard';

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <AuthGuard>
      <MainLayout>{children}</MainLayout>
    </AuthGuard>
  );
}
