import { ISubmissionXdrSubmitResponse } from '../submission/ISubmissionXdrSubmitResponse';

import { IBaseApiResponse } from '@/types/api.types';

export interface ISubmissionService {
	submitXdr: (
		xdr: string,
	) => Promise<IBaseApiResponse<ISubmissionXdrSubmitResponse>>;
}
