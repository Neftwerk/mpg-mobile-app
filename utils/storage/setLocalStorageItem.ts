import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocalStorageItem = async (
	key: string,
	value: string,
): Promise<void> => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch (error) {
		console.error(error);
	}
};
