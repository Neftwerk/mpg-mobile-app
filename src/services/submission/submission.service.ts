import { ApiRequestConfig, apiService } from '../api.services';

import { IApiService } from '@/interfaces/services/IApiService';
import { ISubmissionService } from '@/interfaces/services/ISubmissionService';
import { ISubmissionXdrSubmitResponse } from '@/interfaces/submission/ISubmissionXdrSubmitResponse';
import { IBaseApiResponse } from '@/types/api.types';

class SubmissionService implements ISubmissionService {
	constructor(private readonly api: IApiService<ApiRequestConfig>) {}
	async submitXdr(xdr: string) {
		return await this.api.post<IBaseApiResponse<ISubmissionXdrSubmitResponse>>(
			'/submission',
			{ xdr },
		);
	}
}

export const submissionService = new SubmissionService(apiService);
