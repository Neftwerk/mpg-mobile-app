import { Stack, router } from 'expo-router';

import { BackButton } from '@/components/BackButton/BackButton';

export default function AuthLayout() {
	return (
		<Stack
			screenOptions={{
				headerTransparent: true,
				headerTitleStyle: { color: 'transparent' },
				headerTitle: '',
				headerBackTitle: '',
				headerBackVisible: false,
				headerLeft: () =>
					router.canGoBack() && <BackButton returnType={'back'} />,
			}}
		>
			<Stack.Screen name="login" />
			<Stack.Screen name="register" />
			<Stack.Screen name="forgot-password" />
			<Stack.Screen name="confirm-user" />
			<Stack.Screen name="confirm-password" />
		</Stack>
	);
}
