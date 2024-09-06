'use client';

import { type PropsWithChildren, useContext, useEffect, useState } from 'react';

import { StorageService } from '@/services/storage/storage.service';

import { AuthContext } from './auth-context';

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(
    StorageService.user_token.get(),
  );

  useEffect(() => {
    StorageService.user_token.set(token);
  }, [token]);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
