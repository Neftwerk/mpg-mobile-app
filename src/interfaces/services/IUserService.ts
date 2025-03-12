import { ISignUpResponse } from '../auth/ISignUpResponse';
import { IStellarXdrResponse } from '../stellar/IStellarXdrResponse';

import { IBaseApiResponse } from '@/types/api.types';

export interface IUserService {
	createWallet: (
		masterKey: string,
	) => Promise<IBaseApiResponse<IStellarXdrResponse>>;
	addWalletToUser: (
		masterKey: string,
	) => Promise<IBaseApiResponse<ISignUpResponse>>;
}
