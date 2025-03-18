import { IServerDomainKeyValueResponse } from '../IServerDomainKeyValueResponse.interface';

export interface IGenerateRecoveryTokenRequest {
	signedChallenges: IServerDomainKeyValueResponse;
}
