import { createContext } from 'react';

import type { UserDto } from '@/services/user/dtos/user.dto';

interface AuthContextType {
  user: UserDto | null;
  setUser(user: UserDto): void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {
    throw new Error('you need to setup auth provider');
  },
});
