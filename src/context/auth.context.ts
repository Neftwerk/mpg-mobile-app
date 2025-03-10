import { createContext, useContext } from 'react';

import { IUser } from '@/interfaces/entities/user';
import { IAuthContextType } from '@/interfaces/providers/IAuthContextType';

export const AuthContext = createContext<IAuthContextType>({
	isAuthenticated: false,
	setIsAuthenticated: (isAuthenticated: boolean) => {},
	isLoading: true,
	setIsLoading: (isLoading: boolean) => {},
	user: null,
	setUser: (user: IUser | null) => {},
	logout: () => {},
	checkAuth: () => Promise.resolve(),
});

export function useAuthContext() {
	return useContext(AuthContext);
}
