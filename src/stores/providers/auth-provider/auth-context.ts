import { createContext } from 'react';

interface AuthContextType {
  token: string | null;
  setToken(token: string): void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {
    throw new Error('you need to setup auth provider');
  },
});
