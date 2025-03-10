export interface IConfirmPasswordRequest {
	code: string;
	username: string;
	newPassword: string;
}

export interface IConfirmUserRequest {
	code: string;
	username: string;
}

export interface IForgotPasswordRequest {
	username: string;
}

export interface IRefreshSessionResponse {
	accessToken: string;
}

export interface IRefreshSessionRequest {
	refreshToken: string;
}

export interface IResendConfirmationCodeRequest
	extends IForgotPasswordRequest {}

export interface ISignInRequest {
	username: string;
	password: string;
}

export interface ISignUpRequest {
	username: string;
	password: string;
	name: string;
	surname: string;
	biography?: string;
}
