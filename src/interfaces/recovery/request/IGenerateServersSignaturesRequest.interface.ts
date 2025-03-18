import { IServerDomainKeyValueResponse } from '../IServerDomainKeyValueResponse.interface';

export interface IGenerateServersSignaturesRequest {
	externalAuthTokens: IServerDomainKeyValueResponse;
	transaction: string;
}
