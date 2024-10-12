'use client';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { type PropsWithChildren, useState } from 'react';

import { AddToCartModal } from '@/components/(cart)/add-to-cart-modal/add-to-cart-modal.component';
import { Button } from '@/components/button/button.component';
import { MainLayout } from '@/components/main-layout/main-layout.component';
import { useI18n } from '@/locales/client';
import { AuthGuard } from '@/stores/providers/auth-provider/auth-guard';
import { useCart } from '@/stores/providers/cart-provider/cart-provider';

export default function PrivateLayout({ children }: PropsWithChildren) {
  const t = useI18n();
  const { cart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const isConfirmVisible = cart.length !== 0 && !pathname.startsWith('/cart');

  return (
    <AuthGuard>
      <MainLayout>
        {children}
        {isConfirmVisible && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className='dark type-4r absolute bottom-16 left-4 z-20 size-[60px] rounded-full bg-success-100 pt-1 text-foreground-100 shadow-md active:border active:border-success-100 active:bg-success-20 active:text-success-100'
          >
            {t('general.complete')}
          </Button>
        )}
        <AnimatePresence>
          {isModalOpen && (
            <AddToCartModal onClose={() => setIsModalOpen(false)} />
          )}
        </AnimatePresence>
      </MainLayout>
    </AuthGuard>
  );
}
