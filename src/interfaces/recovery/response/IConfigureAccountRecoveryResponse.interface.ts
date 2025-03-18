import { IServerDomainKeyValueResponse } from '../IServerDomainKeyValueResponse.interface';

export interface IConfigureAccountRecoveryResponse {
	xdr: string;
	signers: IServerDomainKeyValueResponse;
}
