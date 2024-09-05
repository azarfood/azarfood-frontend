'use client';

import { useRouter } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { useIsHydrated } from '@/hooks/use-is-hydrated';
import { StorageService } from '@/services/storage/storage.service';
import { UserService } from '@/services/user/user.service';

import { useAuth } from './auth-provider';

export function AuthGuard({ children }: PropsWithChildren) {
  const isUserFetched = useRef(false);
  const isHydrated = useIsHydrated();
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isUserFetched.current) {
      return;
    }
    isUserFetched.current = true;
    async function fetchUser() {
      try {
        setIsLoading(true);
        if (StorageService.user_token.get()) {
          const user = await UserService.getMe();
          if (user.success) {
            setUser(user.data);
            return;
          } else {
            toast.error(user.message);
          }
        }
        // TODO: save current url path in a storage or query params
        router.push('/login');
        StorageService.reset();
      } finally {
        setIsLoading(false);
      }
    }
    if (!user) {
      void fetchUser();
    }
  }, [user, setUser, router]);

  // TODO: add proper loading screen
  if (isLoading || !isHydrated) {
    return <div>loading...</div>;
  }

  if (user) {
    return children;
  }
}
