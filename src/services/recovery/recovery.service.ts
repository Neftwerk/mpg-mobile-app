import { formatTokenHeaders } from '../../../utils/formatTokenHeaders';
import { ApiRequestConfig, apiService } from '../api.services';

import { IAuthenticateWithVerificationCodeRequest } from '@/interfaces/recovery/request/IAuthenticateWithVerificationCodeRequest.interface';
import { IConfigureAccountRecoveryRequest } from '@/interfaces/recovery/request/IConfigureAccountRecoveryRequest.interface';
import { ICreateSignerRequest } from '@/interfaces/recovery/request/ICreateSignerRequest.interface';
import { IGenerateRecoveryTokenRequest } from '@/interfaces/recovery/request/IGenerateRecoveryTokenRequest.interface';
import { IGenerateServersSignaturesRequest } from '@/interfaces/recovery/request/IGenerateServersSignaturesRequest.interface';
import { IRecoverAccountRequest } from '@/interfaces/recovery/request/IRecoverAccountRequest.interface';
import { IConfigureAccountRecoveryResponse } from '@/interfaces/recovery/response/IConfigureAccountRecoveryResponse.interface';
import { IGenerateRecoveryChallengeResponse } from '@/interfaces/recovery/response/IGenerateRecoveryChallengeResponse.interface';
import { IGenerateRecoveryTokenResponse } from '@/interfaces/recovery/response/IGenerateRecoveryTokenResponse.interface';
import { IVerifyExternalAuthCodesResponse } from '@/interfaces/recovery/response/IVerifyExternalAuthCodesResponse.interface';
import { IApiService } from '@/interfaces/services/IApiService';
import { IRecoveryService } from '@/interfaces/services/IRecoveryService';
import { IStellarXdrResponse } from '@/interfaces/stellar/IStellarXdrResponse';
import { IBaseApiResponse } from '@/types/api.types';

class RecoveryService implements IRecoveryService {
	api: IApiService<ApiRequestConfig>;
	constructor(api: IApiService<ApiRequestConfig>) {
		this.api = api;
	}

	async getAuthChallenges() {
		return await this.api.get<
			IBaseApiResponse<IGenerateRecoveryChallengeResponse>
		>('/recovery/auth');
	}

	async generateRecoveryTokens({
		signedChallenges,
	}: IGenerateRecoveryTokenRequest) {
		return await this.api.post<
			IBaseApiResponse<IGenerateRecoveryTokenResponse>
		>('/recovery/auth', { signedChallenges });
	}

	async configureRecovery({
		deviceKey,
		tokens,
	}: IConfigureAccountRecoveryRequest) {
		return await this.api.post<
			IBaseApiResponse<IConfigureAccountRecoveryResponse>
		>(
			'/recovery/configuration',
			{ deviceKey },
			{
				headers: {
					'Content-Type': 'application/json',
					...formatTokenHeaders(tokens),
				},
			},
		);
	}

	async saveSigner({ signers }: ICreateSignerRequest) {
		await this.api.post('/recovery/signer', { signers });
	}

	async sendVerificationCodes() {
		await this.api.get('/recovery/external-auth/verification');
	}

	async authenticateWithVerificationCode({
		codes,
	}: IAuthenticateWithVerificationCodeRequest) {
		return await this.api.post<
			IBaseApiResponse<IVerifyExternalAuthCodesResponse>
		>('/recovery/external-auth/authentication', { codes });
	}

	async recoverAccount({ newDeviceKey }: IRecoverAccountRequest) {
		return await this.api.post<IBaseApiResponse<IStellarXdrResponse>>(
			'/recovery',
			{ newDeviceKey },
		);
	}

	async generateServersSignatures({
		externalAuthTokens,
		transaction,
	}: IGenerateServersSignaturesRequest) {
		return await this.api.post<IBaseApiResponse<IStellarXdrResponse>>(
			'/recovery/signature',
			{ transaction },
			{
				headers: {
					'Content-Type': 'application/json',
					...formatTokenHeaders(externalAuthTokens),
				},
			},
		);
	}
}
export const recoveryService = new RecoveryService(apiService);
