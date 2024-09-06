import type { PropsWithChildren } from 'react';

import SecondaryLogo from '@/assets/icons/secondary-logo.svg';
import { AuthGuard } from '@/stores/providers/auth-provider/auth-guard';

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <AuthGuard>
      <div className='relative mx-auto flex h-full min-h-svh w-full max-w-[430px] flex-col bg-foreground-100'>
        <header className='sticky top-0 flex h-16 w-full flex-shrink-0 justify-end bg-secondary-100 px-6 py-5'>
          <SecondaryLogo className='h-full w-fit' />
        </header>
        <main className='flex-1 overflow-auto px-5'>{children}</main>
        <footer className='h-12 w-full flex-shrink-0 bg-secondary-100'></footer>
      </div>
    </AuthGuard>
  );
}
