import { AxiosError } from 'axios';
import { useCallback, useMemo, useState } from 'react';

import { AuthContext } from './auth.context';

import { useLoadingState } from '@/hooks/useLoadingState';
import { IUser } from '@/interfaces/entities/user';
import { authService } from '@/services/auth/auth.service';
import tokenStorage from '@/services/storage/token-storage';

export function AuthProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useLoadingState(true);
	const [user, setUser] = useState<IUser | null>(null);

	const clearAuthState = useCallback(() => {
		setUser(null);
		setIsAuthenticated(false);
		tokenStorage.clearTokens();
	}, []);

	const handleTokenRefresh = useCallback(async () => {
		try {
			const refreshToken = await tokenStorage.getRefreshToken();
			if (refreshToken) {
				const refreshedAccessToken = (
					await authService.refreshToken(refreshToken)
				).data.attributes.accessToken;

				await tokenStorage.setAccessToken(refreshedAccessToken);

				setIsAuthenticated(true);
			} else {
				clearAuthState();
			}
		} catch (error) {
			console.error('Error en handleTokenRefresh:', error);
			clearAuthState();
		}
	}, [clearAuthState]);

	const checkAuth = useCallback(async () => {
		try {
			const token = await tokenStorage.getAccessToken();
			if (!token) {
				setIsAuthenticated(false);
				setIsLoading(false);
				return;
			}

			const user = (await authService.getMe()).data.attributes;
			if (user) {
				setUser(user as IUser);
				setIsAuthenticated(true);
			}
		} catch (error) {
			if (error instanceof AxiosError && error.response?.status === 401) {
				await handleTokenRefresh();
			} else {
				clearAuthState();
			}
		} finally {
			setIsLoading(false);
		}
	}, [setIsLoading, clearAuthState, handleTokenRefresh]);

	const logout = useCallback(() => {
		clearAuthState();
	}, [clearAuthState]);

	const contextValue = useMemo(
		() => ({
			isAuthenticated,
			isLoading,
			user,
			setUser,
			setIsAuthenticated,
			setIsLoading,
			logout,
			checkAuth,
		}),
		[
			isAuthenticated,
			isLoading,
			user,
			setUser,
			setIsAuthenticated,
			setIsLoading,
			logout,
			checkAuth,
		],
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}
