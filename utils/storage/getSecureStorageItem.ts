import * as SecureStore from 'expo-secure-store';

import { ERROR_MESSAGES } from '@/errors/messages/error.messages';

const getSecureStorageItem = async (keyIdentifier: string): Promise<string> => {
	try {
		const keychainService = `secretKey-${keyIdentifier}`;
		const secretKey = await SecureStore.getItemAsync(keyIdentifier, {
			keychainService,
		});

		return secretKey ?? '';
	} catch {
		throw new Error(ERROR_MESSAGES.GETTING_SECRET_KEY);
	}
};

export default getSecureStorageItem;
