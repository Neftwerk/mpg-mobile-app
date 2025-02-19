import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { queryClient } from '../config/react-query';

interface QueryClientProviderProps {
	children: React.ReactNode;
}

export function QueryClientProvider({ children }: QueryClientProviderProps) {
	return (
		<TanStackQueryClientProvider client={queryClient}>
			{children}
		</TanStackQueryClientProvider>
	);
}
