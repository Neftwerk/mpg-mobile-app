import { formatEmailAsKey } from './formatEmailAsKey';
import getSecureStorageItem from './storage/getSecureStorageItem';
import setSecureStorageItem from './storage/setSecureStorageItem';

import { ERROR_MESSAGES } from '@/errors/messages/error.messages';

export const storeDeviceSecretKey = async (
	accountEmail: string,
	deviceSecretKey: string,
): Promise<void> => {
	try {
		const formattedEmail = formatEmailAsKey(accountEmail);
		await setSecureStorageItem(formattedEmail, deviceSecretKey);
	} catch (error) {
		console.error(error);
		throw new Error(ERROR_MESSAGES.GEN_DEVICE_KEYPAIR);
	}
};

export const getDeviceSecretKey = async (
	accountEmail: string,
): Promise<string> => {
	const formattedEmail = formatEmailAsKey(accountEmail);
	return await getSecureStorageItem(formattedEmail);
};
