import { ISignUpRequest } from '../api/api';
import { IRefreshSessionResponse } from '../auth/IRefreshSessionResponse';
import { ISignInResponse } from '../auth/ISignInResponse';
import { ISignUpResponse } from '../auth/ISignUpResponse';
import { ISuccessfulAuthenticationResponse } from '../auth/ISuccessfulAuthenticationResponse';

import { ApiRequestConfig } from '@/services/api.services';
import { IBaseApiResponse } from '@/types/api.types';

export interface IAuthService {
	signUp: (
		signUpData: ISignUpRequest,
		config?: ApiRequestConfig,
	) => Promise<IBaseApiResponse<ISignUpResponse>>;
	signIn: (
		username: string,
		password: string,
		config?: ApiRequestConfig,
	) => Promise<IBaseApiResponse<ISignInResponse>>;
	confirmUser: (
		username: string,
		code: string,
		config?: ApiRequestConfig,
	) => Promise<IBaseApiResponse<ISuccessfulAuthenticationResponse>>;
	confirmPassword: (
		username: string,
		newPassword: string,
		code: string,
		config?: ApiRequestConfig,
	) => Promise<IBaseApiResponse<ISuccessfulAuthenticationResponse>>;
	resendConfirmationCode: (
		username: string,
		config?: ApiRequestConfig,
	) => Promise<IBaseApiResponse<ISuccessfulAuthenticationResponse>>;
	forgotPassword: (
		username: string,
		config?: ApiRequestConfig,
	) => Promise<IBaseApiResponse<ISuccessfulAuthenticationResponse>>;
	refreshToken: (
		refreshToken: string,
		config?: ApiRequestConfig,
	) => Promise<IBaseApiResponse<IRefreshSessionResponse>>;
	getMe: (
		config?: ApiRequestConfig,
	) => Promise<IBaseApiResponse<ISignUpResponse>>;
}
