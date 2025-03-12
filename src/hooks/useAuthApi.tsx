import { Networks, TransactionBuilder } from '@stellar/stellar-sdk';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Href, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { storeDeviceSecretKey } from 'utils/handleDeviceSecretKey';
import { generateKeypair } from 'utils/stellar/generateKeypair';

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
import { submissionService } from '@/services/submission/submission.service';
import { userService } from '@/services/user/user.service';

export function useAuth() {
	const router = useRouter();
	const { setIsAuthenticated, setUser } = useAuthContext();
	const [isLoading, setIsLoading] = useState({
		firstLogin: false,
		signIn: false,
	});

	const signInMutation = useMutation({
		mutationFn: async ({ username, password }: ISignInRequest) => {
			setIsLoading({ ...isLoading, signIn: true });
			return authService.signIn(username, password);
		},
		onSuccess: async (response) => {
			const { accessToken, refreshToken } = response.data.attributes;
			if (accessToken && refreshToken) {
				await tokenStorage.setAccessToken(accessToken);
				await tokenStorage.setRefreshToken(refreshToken);
			}

			const user = (await authService.getMe()).data.attributes;
			if (user) {
				setUser(user as IUser);
			}

			if (user && !user.masterKey) {
				setIsLoading({ ...isLoading, firstLogin: true });
				const userKeypair = generateKeypair();

				const { xdr } = (
					await userService.createWallet(userKeypair.publicKey())
				).data.attributes;

				const transaction = TransactionBuilder.fromXDR(xdr, Networks.TESTNET);
				transaction.sign(userKeypair);

				await submissionService.submitXdr(transaction.toXDR());

				await storeDeviceSecretKey(user.username, userKeypair.secret());

				const {
					data: { attributes: userResponse },
				} = await userService.addWalletToUser(userKeypair.publicKey());

				if (userResponse) {
					setUser(userResponse as IUser);
				}
			}
			setIsLoading({ firstLogin: false, signIn: false });
			setIsAuthenticated(true);
			router.replace(NavigationRoutes.HOME);
		},
		onError: (error: IBaseApiResponseError) => {
			if (error instanceof AxiosError) {
				Alert.alert(String(error.response?.data.message));
			} else if (error instanceof Error) {
				Alert.alert(String(error.message));
			} else if (error.error.title) {
				Alert.alert(String(error.error.title));
			}
			setIsLoading({ firstLogin: false, signIn: false });
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
		isLoading,
	};
}
