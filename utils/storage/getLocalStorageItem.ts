import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLocalStorageItem = async (
	key: string,
): Promise<string | null> => {
	try {
		const value = await AsyncStorage.getItem(key);
		return value;
	} catch (error) {
		console.error(error);
		return null;
	}
};
