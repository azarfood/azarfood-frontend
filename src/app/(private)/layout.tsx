'use client';
import type { PropsWithChildren } from 'react';

import { Button } from '@/components/button/button.component';
import { MainLayout } from '@/components/main-layout/main-layout.component';
import { useI18n } from '@/locales/client';
import { AuthGuard } from '@/stores/providers/auth-provider/auth-guard';

export default function PrivateLayout({ children }: PropsWithChildren) {
  const t = useI18n();

  return (
    <AuthGuard>
      <MainLayout>
        {children}
        <Button className='dark type-4r absolute bottom-16 left-4 z-20 size-[60px] rounded-full bg-success-100 pt-1 text-foreground-100 shadow-md active:border active:border-success-100 active:bg-success-20 active:text-success-100'>
          {t('general.complete')}
        </Button>
      </MainLayout>
    </AuthGuard>
  );
}
