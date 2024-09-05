'use client';

import { type PropsWithChildren, useContext, useState } from 'react';

import type { UserDto } from '@/services/user/dtos/user.dto';

import { AuthContext } from './auth-context';

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserDto | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
