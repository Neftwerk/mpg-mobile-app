import { IServerDomainKeyValueResponse } from '../IServerDomainKeyValueResponse.interface';

export interface IGenerateRecoveryChallengeResponse {
	challenges: IServerDomainKeyValueResponse;
}
