import { IServerDomainKeyValueResponse } from '@/interfaces/recovery/IServerDomainKeyValueResponse.interface';

export const formatTokenHeaders = (
	externalAuthTokens: IServerDomainKeyValueResponse,
) => {
	return Object.fromEntries(
		Object.entries(externalAuthTokens).map(([domain, token]) => [
			`${domain}-recovery-token`,
			token,
		]),
	);
};
