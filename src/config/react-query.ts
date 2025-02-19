import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 2,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
			staleTime: 5 * 60 * 1000, // 5 minutes
			gcTime: 10 * 60 * 1000, // 10 minutes
			refetchOnWindowFocus: false,
			refetchOnReconnect: true,
		},
		mutations: {
			retry: 2,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		},
	},
});
