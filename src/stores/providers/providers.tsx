'use client';

import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './auth-provider/auth-provider';
import ReactQueryProvider from './react-query-provider/react-query-provider';

dayjs.extend(jalaliday).calendar('jalali');

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <ReactQueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </ReactQueryProvider>
      <Toaster />
    </>
  );
}
