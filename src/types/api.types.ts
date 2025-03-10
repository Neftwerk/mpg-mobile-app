export interface IApiResponseError {
	error: string;
	message: string;
	statusCode: number;
}

export interface IRefreshSessionResponse {
	accessToken: string;
}

export interface IBaseApiResponse<T> {
	data: {
		type: string;
		id?: number;
		attributes: T;
	};
	links: {
		self: string;
	};
}
