import React from 'react';
import { Text, View } from 'react-native';

import BackgroundWrapper from '@/components/BackgroundWrapper/BackgroundWrapper';

export default function ProfileScreen() {
	return (
		<BackgroundWrapper>
			<View
				testID="ProfileScreen"
				className="flex-1 justify-center items-center bg-transparent"
			>
				<Text testID="ProfileScreenText">Profile</Text>
			</View>
		</BackgroundWrapper>
	);
}
