import { IServerDomainKeyValueResponse } from '../IServerDomainKeyValueResponse.interface';

export interface IConfigureAccountRecoveryRequest {
	deviceKey: string;
	tokens: IServerDomainKeyValueResponse;
}
