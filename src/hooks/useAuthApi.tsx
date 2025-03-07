import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Href, useRouter } from 'expo-router';
import { Alert } from 'react-native';

import { NavigationRoutes } from '@/constants/navigation.routes.enum';
import { useAuthContext } from '@/context/auth.context';
import { IBaseApiResponseError } from '@/interfaces/api/IApiResponseError';
import {
	IConfirmPasswordRequest,
	IConfirmUserRequest,
	ISignInRequest,
	ISignUpRequest,
} from '@/interfaces/api/api';
import { IUser } from '@/interfaces/entities/user';
import { authService } from '@/services/auth/auth.service';
import tokenStorage from '@/services/storage/token-storage';

export function useAuth() {
	const router = useRouter();
	const { setIsAuthenticated, setUser } = useAuthContext();

	const signInMutation = useMutation({
		mutationFn: async ({ username, password }: ISignInRequest) =>
			authService.signIn(username, password),
		onSuccess: async (response) => {
			const { accessToken, refreshToken } = response.data.attributes;

			if (accessToken && refreshToken) {
				await tokenStorage.setAccessToken(accessToken);
				await tokenStorage.setRefreshToken(refreshToken);
			}

			const user = (await authService.getMe()).data.attributes;
			if (user) {
				setUser(user as IUser);
				setIsAuthenticated(true);
			}

			setIsAuthenticated(true);
			router.replace(NavigationRoutes.HOME);
		},
		onError: (error: IBaseApiResponseError) => {
			console.error('ERROR:: ', JSON.stringify(error, null, 2));
			if (error instanceof AxiosError) {
				Alert.alert(String(error.response?.data.message));
			} else if (error instanceof Error) {
				Alert.alert(String(error.message));
			} else if (error.error.title) {
				Alert.alert(String(error.error.title));
			}
		},
	});

	const signUpMutation = useMutation({
		mutationFn: async (newUser: ISignUpRequest) => {
			return authService.signUp(newUser);
		},

		onSuccess: (_, { username }) => {
			router.push({
				pathname: NavigationRoutes.CONFIRM_USER,
				params: {
					username: username,
				},
			});
		},
		onError: (error: IBaseApiResponseError) => {
			console.error({ error });
			console.error('ERROR:: ', JSON.stringify(error.error, null, 2));
			Alert.alert(String(error.error.title), String(error.error.detail));
		},
	});

	const confirmUserMutation = useMutation({
		mutationFn: async ({ username, code }: IConfirmUserRequest) =>
			authService.confirmUser(username, code),
		onSuccess: (response) => {
			const message = response?.data?.attributes?.message;
			if (message) {
				Alert.alert(message);
				router.replace(NavigationRoutes.LOGIN as Href);
			}
		},
		onError: (error: IBaseApiResponseError) => {
			console.error('ERROR:: ', JSON.stringify(error.error, null, 2));
			Alert.alert(String(error.error.title), String(error.error.detail));
		},
	});

	const forgotPasswordMutation = useMutation({
		mutationFn: async (username: string) =>
			authService.forgotPassword(username),
		onSuccess: (response, username) => {
			const message = response?.data?.attributes?.message;
			if (message) {
				Alert.alert(message);
				router.push({
					pathname: NavigationRoutes.CONFIRM_PASSWORD,
					params: { username },
				});
			}
		},
		onError: (error: IBaseApiResponseError) => {
			console.error('ERROR:: ', JSON.stringify(error.error, null, 2));
			Alert.alert(String(error.error.title), String(error.error.detail));
		},
	});

	const confirmPasswordMutation = useMutation({
		mutationFn: async ({
			username,
			newPassword,
			code,
		}: IConfirmPasswordRequest) => {
			return await authService.confirmPassword(username, newPassword, code);
		},
		onSuccess: (response) => {
			const message = response?.data?.attributes?.message;

			if (message) {
				Alert.alert(message);
				router.replace(NavigationRoutes.LOGIN as Href);
			}
		},
		onError: (error: IBaseApiResponseError) => {
			console.error('ERROR:: ', JSON.stringify(error.error, null, 2));
			Alert.alert(String(error.error.title), String(error.error.detail));
		},
	});

	const resendConfirmationMutation = useMutation({
		mutationFn: async (username: string) =>
			authService.resendConfirmationCode(username),

		onSuccess: (response) => {
			const message = response?.data?.attributes?.message;
			if (message) {
				Alert.alert(message);
				router.replace(NavigationRoutes.LOGIN as Href);
			}
		},
		onError: (error: IBaseApiResponseError) => {
			console.error('ERROR:: ', JSON.stringify(error.error, null, 2));
			Alert.alert(String(error.error.title), String(error.error.detail));
		},
	});

	return {
		signInMutation,
		signUpMutation,
		confirmUserMutation,
		forgotPasswordMutation,
		confirmPasswordMutation,
		resendConfirmationMutation,
	};
}
