import React from 'react';
import { Text, View } from 'react-native';

import BackgroundWrapper from '@/components/BackgroundWrapper/BackgroundWrapper';

export default function WalletScreen() {
	return (
		<BackgroundWrapper>
			<View
				testID="WalletScreen"
				className="flex-1 justify-center items-center bg-transparent"
			>
				<Text testID="WalletScreenText">Wallet</Text>
			</View>
		</BackgroundWrapper>
	);
}
