import { signTransaction } from '../stellar/signTransaction';

import { ERROR_MESSAGES } from '@/errors/messages/error.messages';
import { IServerDomainKeyValueResponse } from '@/interfaces/recovery/IServerDomainKeyValueResponse.interface';

export const signChallenges = (
	secretKey: string,
	challenges: IServerDomainKeyValueResponse,
): IServerDomainKeyValueResponse => {
	try {
		return Object.fromEntries(
			Object.entries(challenges).map(([key, xdr]) => [
				key,
				signTransaction(xdr, secretKey),
			]),
		);
	} catch (error) {
		console.error('Error signing challenges:', error);
		throw new Error(ERROR_MESSAGES.SIGNING_CHALLENGES);
	}
};
