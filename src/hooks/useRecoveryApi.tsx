import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { storeDeviceSecretKey } from '../../utils/handleDeviceSecretKey';
import { generateKeypair } from '../../utils/stellar/generateKeypair';

import { NavigationRoutes } from '@/constants/navigation.routes.enum';
import { useAuthContext } from '@/context/auth.context';
import { ERROR_MESSAGES } from '@/errors/messages/error.messages';
import { IBaseApiResponseError } from '@/interfaces/api/IApiResponseError';
import { IAuthenticateWithVerificationCodeRequest } from '@/interfaces/recovery/request/IAuthenticateWithVerificationCodeRequest.interface';
import { recoveryService } from '@/services/recovery/recovery.service';
import { submissionService } from '@/services/submission/submission.service';

export function useRecoveryApi() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { user, setIsAuthenticated } = useAuthContext();

	const submitRecoveryCodes = useMutation({
		mutationFn: async ({ codes }: IAuthenticateWithVerificationCodeRequest) => {
			setIsLoading(true);
			return recoveryService.authenticateWithVerificationCode({ codes });
		},
		onSuccess: async (response) => {
			if (!user) {
				throw new Error(ERROR_MESSAGES.USER_NOT_FOUND_BEFORE_RECOVERY);
			}
			const { externalAuthTokens } = response.data.attributes;

			const newDeviceKey = generateKeypair();

			const {
				data: {
					attributes: { xdr },
				},
			} = await recoveryService.recoverAccount({
				newDeviceKey: newDeviceKey.publicKey(),
			});

			const {
				data: {
					attributes: { xdr: transaction },
				},
			} = await recoveryService.generateServersSignatures({
				externalAuthTokens,
				transaction: xdr,
			});

			await submissionService.submitXdr(transaction);

			await storeDeviceSecretKey(user.username, newDeviceKey.secret(), false);

			setIsLoading(false);
			setIsAuthenticated(true);
			return router.replace(NavigationRoutes.HOME);
		},
		onError: (error: IBaseApiResponseError) => {
			if (error instanceof AxiosError) {
				Alert.alert(String(error.response?.data.message));
			} else if (error instanceof Error) {
				Alert.alert(String(error.message));
			} else if (error.error.title) {
				Alert.alert(String(error.error.title));
			}
			setIsLoading(false);
			setIsAuthenticated(false);
			router.replace(NavigationRoutes.LOGIN);
		},
	});

	return {
		submitRecoveryCodes,
		isLoading,
	};
}
