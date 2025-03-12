import * as SecureStore from 'expo-secure-store';

import { ERROR_MESSAGES } from '@/errors/messages/error.messages';

const setSecureStorageItem = async (
	serviceIdentifier: string,
	secretKey: string,
): Promise<void> => {
	try {
		const keychainService = `secretKey-${serviceIdentifier}`;
		await SecureStore.setItemAsync(serviceIdentifier, secretKey, {
			keychainService,
		});
	} catch {
		throw new Error(ERROR_MESSAGES.STORING_KEYPAIR);
	}
};

export default setSecureStorageItem;
