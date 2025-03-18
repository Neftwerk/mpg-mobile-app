import { formatEmailAsKey } from './formatEmailAsKey';
import getSecureStorageItem from './storage/getSecureStorageItem';
import setSecureStorageItem from './storage/setSecureStorageItem';

import { ERROR_MESSAGES } from '@/errors/messages/error.messages';

export const storeDeviceSecretKey = async (
	accountEmail: string,
	deviceSecretKey: string,
	isMasterKey: boolean = true,
): Promise<void> => {
	try {
		const formattedEmail = `${isMasterKey ? 'master' : 'device'}-${formatEmailAsKey(accountEmail)}`;
		await setSecureStorageItem(formattedEmail, deviceSecretKey);
	} catch {
		throw new Error(ERROR_MESSAGES.GEN_DEVICE_KEYPAIR);
	}
};

export const getDeviceSecretKey = async (
	accountEmail: string,
	isMasterKey: boolean = true,
): Promise<string> => {
	const formattedEmail = `${isMasterKey ? 'master' : 'device'}-${formatEmailAsKey(accountEmail)}`;
	return await getSecureStorageItem(formattedEmail);
};
