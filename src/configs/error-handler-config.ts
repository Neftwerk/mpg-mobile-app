import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';

import { TOKEN_EXPIRED_ERROR } from '@/constants/errors';
import { ApiResponseError } from '@/errors/ApiResonseError';
import { IBaseApiResponseError } from '@/interfaces/api/IApiResponseError';
import tokenStorage from '@/services/storage/token-storage';
import { IBaseApiResponse, IRefreshSessionResponse } from '@/types/api.types';

export function createErrorHandler(instance: AxiosInstance) {
	return async function handleAxiosError(
		error: Error | AxiosError<IBaseApiResponseError>,
	) {
		if (!axios.isAxiosError<IBaseApiResponseError>(error) || !error.response) {
			return Promise.reject(error);
		}

		const originalRequest = error.config;
		const shouldRefresh =
			error.response.status === HttpStatusCode.Unauthorized &&
			error.response.data.error.title === TOKEN_EXPIRED_ERROR;

		if (shouldRefresh && originalRequest) {
			const refreshToken = await tokenStorage.getRefreshToken();
			const refreshResponse = await instance.post<
				IBaseApiResponse<IRefreshSessionResponse>
			>('/auth/refresh', { refreshToken });

			await tokenStorage.setAccessToken(
				refreshResponse.data.data.attributes.accessToken,
			);
			const authorization = `Bearer ${refreshResponse.data.data.attributes.accessToken}`;
			instance.defaults.headers.common['Authorization'] = authorization;
			originalRequest.headers.Authorization = authorization;
			return instance(originalRequest);
		}

		return Promise.reject(
			new ApiResponseError(
				error.response.data.error.detail,
				error.response.data.error.source.pointer,
				+error.response.data.error.status,
			),
		);
	};
}
