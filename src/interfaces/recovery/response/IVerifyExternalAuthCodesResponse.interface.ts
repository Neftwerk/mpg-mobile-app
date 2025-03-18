import { IServerDomainKeyValueResponse } from '../IServerDomainKeyValueResponse.interface';

export interface IVerifyExternalAuthCodesResponse {
	externalAuthTokens: IServerDomainKeyValueResponse;
}
