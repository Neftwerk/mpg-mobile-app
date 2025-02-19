export interface IApiResponseError {
	error: string;
	message: string;
	statusCode: number;
}

export interface IRefreshSessionResponse {
	accessToken: string;
	refreshToken: string;
}

export interface IApiResponse<T> {
	data: T;
	message?: string;
	statusCode: number;
}
