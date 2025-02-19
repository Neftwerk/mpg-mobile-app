import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';

import { createErrorHandler } from './error-handler-config';

import { IHTTPRequestService } from '@/interfaces/IHTTPRequestService';
import tokenStorage from '@/services/storage/token-storage';

export const axiosInstance = axios.create({
	baseURL: Constants.expoConfig?.extra?.API_URL,
});

axiosInstance.interceptors.response.use(
	(response) => response,
	createErrorHandler(axiosInstance),
);

axiosInstance.interceptors.request.use(async (config) => {
	const token = await tokenStorage.getAccessToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

function createAxiosService(
	instance: AxiosInstance,
): IHTTPRequestService<AxiosRequestConfig> {
	return {
		get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
			const response = await instance.get<T>(url, config);
			return response.data;
		},
		post: async <T, K = unknown>(
			url: string,
			body: K,
			config?: AxiosRequestConfig,
		): Promise<T> => {
			const response = await instance.post<T>(url, body, config);
			return response.data;
		},
		patch: async <T, K = unknown>(
			url: string,
			body: K,
			config?: AxiosRequestConfig,
		): Promise<T> => {
			const response = await axiosInstance.patch(url, body, config);
			return response.data;
		},
		put: async <T, K = unknown>(
			url: string,
			body: K,
			config?: AxiosRequestConfig,
		): Promise<T> => {
			const response = await axiosInstance.put(url, body, config);
			return response.data;
		},
		delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
			const response = await axiosInstance.delete<T>(url, config);
			return response.data;
		},
		setAuthentication: (token: string) => {
			instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		},
	};
}

export const axiosService = createAxiosService(axiosInstance);
