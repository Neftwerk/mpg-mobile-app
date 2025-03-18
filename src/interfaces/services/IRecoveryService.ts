import { IAuthenticateWithVerificationCodeRequest } from '../recovery/request/IAuthenticateWithVerificationCodeRequest.interface';
import { IConfigureAccountRecoveryRequest } from '../recovery/request/IConfigureAccountRecoveryRequest.interface';
import { ICreateSignerRequest } from '../recovery/request/ICreateSignerRequest.interface';
import { IGenerateRecoveryTokenRequest } from '../recovery/request/IGenerateRecoveryTokenRequest.interface';
import { IGenerateServersSignaturesRequest } from '../recovery/request/IGenerateServersSignaturesRequest.interface';
import { IRecoverAccountRequest } from '../recovery/request/IRecoverAccountRequest.interface';
import { IConfigureAccountRecoveryResponse } from '../recovery/response/IConfigureAccountRecoveryResponse.interface';
import { IGenerateRecoveryChallengeResponse } from '../recovery/response/IGenerateRecoveryChallengeResponse.interface';
import { IGenerateRecoveryTokenResponse } from '../recovery/response/IGenerateRecoveryTokenResponse.interface';
import { IVerifyExternalAuthCodesResponse } from '../recovery/response/IVerifyExternalAuthCodesResponse.interface';
import { IStellarXdrResponse } from '../stellar/IStellarXdrResponse';

import { IBaseApiResponse } from '@/types/api.types';

export interface IRecoveryService {
	getAuthChallenges: () => Promise<
		IBaseApiResponse<IGenerateRecoveryChallengeResponse>
	>;
	generateRecoveryTokens: (
		generateRecoveryTokenRequest: IGenerateRecoveryTokenRequest,
	) => Promise<IBaseApiResponse<IGenerateRecoveryTokenResponse>>;
	configureRecovery: (
		configureRecoveryRequest: IConfigureAccountRecoveryRequest,
	) => Promise<IBaseApiResponse<IConfigureAccountRecoveryResponse>>;
	saveSigner: (saveSignerRequest: ICreateSignerRequest) => Promise<void>;
	sendVerificationCodes: () => Promise<void>;
	authenticateWithVerificationCode: (
		authenticateWithVerificationCodeRequest: IAuthenticateWithVerificationCodeRequest,
	) => Promise<IBaseApiResponse<IVerifyExternalAuthCodesResponse>>;
	recoverAccount: (
		recoverAccountRequest: IRecoverAccountRequest,
	) => Promise<IBaseApiResponse<IStellarXdrResponse>>;
	generateServersSignatures: (
		generateServersSignaturesRequest: IGenerateServersSignaturesRequest,
	) => Promise<IBaseApiResponse<IStellarXdrResponse>>;
}
