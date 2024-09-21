import type { PropsWithChildren } from 'react';

import { MainLayoutFooter } from './main-layout-footer.component';
import { MainLayoutHeader } from './main-layout-header.component';

export interface MainLayoutProps extends PropsWithChildren {
  shouldShowHeader?: boolean;
  shouldShowFooter?: boolean;
}
export function MainLayout({
  children,
  shouldShowHeader = true,
  shouldShowFooter = true,
}: MainLayoutProps) {
  return (
    <div className='relative mx-auto flex h-full min-h-svh w-full max-w-[430px] flex-col bg-foreground-100'>
      {shouldShowHeader && <MainLayoutHeader />}
      <main className='flex-1 overflow-auto px-5'>{children}</main>
      {shouldShowFooter && <MainLayoutFooter />}
    </div>
  );
}
