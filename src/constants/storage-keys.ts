export const STORAGE_KEYS = {
	ACCESS_TOKEN: '@app_access_token',
	REFRESH_TOKEN: '@app_refresh_token',
} as const;

export type StorageKeysType = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
