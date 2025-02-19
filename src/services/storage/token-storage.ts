import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEYS } from '@/constants/storage-keys';

class TokenStorage {
	async getAccessToken(): Promise<string | null> {
		return AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
	}

	async setAccessToken(token: string): Promise<void> {
		return AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
	}

	async getRefreshToken(): Promise<string | null> {
		return AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
	}

	async setRefreshToken(token: string): Promise<void> {
		return AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
	}

	async clearTokens(): Promise<void> {
		await AsyncStorage.multiRemove([
			STORAGE_KEYS.ACCESS_TOKEN,
			STORAGE_KEYS.REFRESH_TOKEN,
		]);
	}
}

export default new TokenStorage();
