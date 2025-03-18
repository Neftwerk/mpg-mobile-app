import { Stack, router } from 'expo-router';

import { BackButton } from '@/components/BackButton/BackButton';
import { GoToBackButtonType } from '@/types/enum/go-to-back-button-type.enum';

export default function AuthLayout() {
	return (
		<Stack
			screenOptions={{
				headerTransparent: true,
				headerTitleStyle: { color: 'transparent' },
				headerLeft: () =>
					router.canGoBack() && (
						<BackButton returnType={GoToBackButtonType.BACK} />
					),
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
