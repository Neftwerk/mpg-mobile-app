import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';
import { getLocalStorageItem } from 'utils/storage/getLocalStorageItem';

import { TOKEN_EXPIRED_ERROR } from '@/constants/errors';
import { ApiResponseError } from '@/errors/ApiResonseError';
import tokenStorage from '@/services/storage/token-storage';
import { IApiResponseError, IRefreshSessionResponse } from '@/types/api.types';

export function createErrorHandler(instance: AxiosInstance) {
	return async function handleAxiosError(
		error: Error | AxiosError<IApiResponseError>,
	) {
		if (!axios.isAxiosError<IApiResponseError>(error) || !error.response) {
			return Promise.reject(error);
		}

		const originalRequest = error.config;
		const shouldRefresh =
			error.response.status === HttpStatusCode.Unauthorized &&
			error.response.data.error === TOKEN_EXPIRED_ERROR;

		if (shouldRefresh && originalRequest) {
			const refreshToken = await tokenStorage.getRefreshToken();
			const username = await getLocalStorageItem('username');
			const refreshResponse = await instance.post<IRefreshSessionResponse>(
				'/auth/refresh',
				{ username, refreshToken },
			);
			await tokenStorage.setAccessToken(refreshResponse.data.accessToken);
			const authorization = `Bearer ${refreshResponse.data.accessToken}`;
			instance.defaults.headers.common['Authorization'] = authorization;
			originalRequest.headers.Authorization = authorization;
			return instance(originalRequest);
		}

		return Promise.reject(
			new ApiResponseError(
				error.response.data.error,
				error.response.data.message,
				error.response.data.statusCode,
			),
		);
	};
}
