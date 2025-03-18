import { Stack, router } from 'expo-router';

import { BackButton } from '@/components/BackButton/BackButton';

export default function RecoveryLayout() {
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
			<Stack.Screen name="recover-account" />
		</Stack>
	);
}
