export interface IApiResponseError {
	error: string;
	message: string;
	statusCode: number;
}

export interface IBaseApiResponseError {
	error: {
		status: string;
		source: {
			pointer: string;
		};
		title: string;
		detail: string;
	};
}
