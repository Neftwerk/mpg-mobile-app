import { ApiRequestConfig, apiService } from '../api.services';

import { ISignUpRequest } from '@/interfaces/api/api';
import { IRefreshSessionResponse } from '@/interfaces/auth/IRefreshSessionResponse';
import { ISignInResponse } from '@/interfaces/auth/ISignInResponse';
import { ISignUpResponse } from '@/interfaces/auth/ISignUpResponse';
import { ISuccessfulAuthenticationResponse } from '@/interfaces/auth/ISuccessfulAuthenticationResponse';
import { IApiService } from '@/interfaces/services/IApiService';
import { IAuthService } from '@/interfaces/services/IAuthService';
import { IBaseApiResponse } from '@/types/api.types';

class AuthService implements IAuthService {
	api: IApiService<ApiRequestConfig>;
	constructor(api: IApiService<ApiRequestConfig>) {
		this.api = api;
	}
	async signIn(username: string, password: string, config?: ApiRequestConfig) {
		return await this.api.post<IBaseApiResponse<ISignInResponse>>(
			'/auth/sign-in',
			{ username, password },
			config,
		);
	}
	async signUp(signUpData: ISignUpRequest, config?: ApiRequestConfig) {
		return await this.api.post<IBaseApiResponse<ISignUpResponse>>(
			'/auth/sign-up',
			signUpData,
			config,
		);
	}
	async confirmUser(username: string, code: string, config?: ApiRequestConfig) {
		return await this.api.post<
			IBaseApiResponse<ISuccessfulAuthenticationResponse>
		>('/auth/confirm-user', { username, code }, config);
	}
	async confirmPassword(
		username: string,
		newPassword: string,
		code: string,
		config?: ApiRequestConfig,
	) {
		return await this.api.post<
			IBaseApiResponse<ISuccessfulAuthenticationResponse>
		>('/auth/confirm-password', { username, newPassword, code }, config);
	}
	async resendConfirmationCode(username: string, config?: ApiRequestConfig) {
		return await this.api.post<
			IBaseApiResponse<ISuccessfulAuthenticationResponse>
		>('/auth/resend-confirmation-code', { username }, config);
	}
	async forgotPassword(username: string, config?: ApiRequestConfig) {
		return await this.api.post<
			IBaseApiResponse<ISuccessfulAuthenticationResponse>
		>('/auth/forgot-password', { username }, config);
	}
	async refreshToken(refreshToken: string, config?: ApiRequestConfig) {
		return await this.api.post<IBaseApiResponse<IRefreshSessionResponse>>(
			'/auth/refresh',
			{ refreshToken },
			config,
		);
	}

	async getMe(config?: ApiRequestConfig) {
		return await this.api.get<IBaseApiResponse<ISignUpResponse>>(
			'/user/me',
			config,
		);
	}
}

export const authService = new AuthService(apiService);
