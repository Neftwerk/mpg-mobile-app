import { ApiRequestConfig, apiService } from '../api.services';

import { ISignUpResponse } from '@/interfaces/auth/ISignUpResponse';
import { IApiService } from '@/interfaces/services/IApiService';
import { IUserService } from '@/interfaces/services/IUserService';
import { IStellarXdrResponse } from '@/interfaces/stellar/IStellarXdrResponse';
import { IBaseApiResponse } from '@/types/api.types';

class UserService implements IUserService {
	api: IApiService<ApiRequestConfig>;
	constructor(api: IApiService<ApiRequestConfig>) {
		this.api = api;
	}
	async createWallet(masterKey: string) {
		return await this.api.post<IBaseApiResponse<IStellarXdrResponse>>(
			'/user/create-wallet',
			{ masterKey },
		);
	}
	async addWalletToUser(masterKey: string) {
		return await this.api.patch<IBaseApiResponse<ISignUpResponse>>(
			'/user/me/wallet',
			{ masterKey },
		);
	}
}

export const userService = new UserService(apiService);
