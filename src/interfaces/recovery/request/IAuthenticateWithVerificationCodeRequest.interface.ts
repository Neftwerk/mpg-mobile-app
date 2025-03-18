import { IServerDomainKeyValueResponse } from '../IServerDomainKeyValueResponse.interface';

export interface IAuthenticateWithVerificationCodeRequest {
	codes: IServerDomainKeyValueResponse;
}
