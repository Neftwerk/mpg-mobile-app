import * as SecureStore from 'expo-secure-store';

const getSecureStorageItem = async (keyIdentifier: string): Promise<string> => {
	try {
		const keychainService = `secretKey-${keyIdentifier}`;
		const secretKey = await SecureStore.getItemAsync(keyIdentifier, {
			keychainService,
		});

		if (secretKey == null) {
			throw new Error(
				'Error getting secret key: No credentials found for identifier',
			);
		}

		return secretKey;
	} catch (error) {
		const err = error as Error;
		throw new Error(err.message);
	}
};

export default getSecureStorageItem;
