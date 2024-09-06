'use client';

import { useRouter } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { useIsHydrated } from '@/hooks/use-is-hydrated';

import { useAuth } from './auth-provider';

export function AuthGuard({ children }: PropsWithChildren) {
  const isHydrated = useIsHydrated();
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !token) {
      router.push('/login');
    }
  }, [token, isHydrated, router]);

  if (!isHydrated) {
    return null;
  }

  if (token) {
    return children;
  }
}
