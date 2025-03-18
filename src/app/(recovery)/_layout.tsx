import { Stack, router } from 'expo-router';

import { BackButton } from '@/components/BackButton/BackButton';
import { GoToBackButtonType } from '@/types/enum/go-to-back-button-type.enum';

export default function RecoveryLayout() {
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
			<Stack.Screen name="recover-account" />
		</Stack>
	);
}
