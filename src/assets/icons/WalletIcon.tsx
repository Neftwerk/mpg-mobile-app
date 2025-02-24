import React from 'react';
import { ImageBackground } from 'react-native';

export const WalletIcon = ({
	width = 31,
	height = 30,
	testID,
}: {
	width?: number;
	height?: number;
	testID?: string;
}) => {
	return (
		<ImageBackground
			source={require('../png/walletIcon.png')}
			style={{ width: width, height: height }}
			resizeMode="contain"
			testID={testID}
		/>
	);
};
