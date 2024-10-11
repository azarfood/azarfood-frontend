'use client';

import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import jalaliday from 'jalaliday';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './auth-provider/auth-provider';
import { CartProvider } from './cart-provider/cart-provider';
import ReactQueryProvider from './react-query-provider/react-query-provider';

dayjs.extend(jalaliday).calendar('jalali');
dayjs.extend(minMax);
dayjs.locale('fa');

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <ReactQueryProvider>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </ReactQueryProvider>
      <Toaster />
    </>
  );
}
