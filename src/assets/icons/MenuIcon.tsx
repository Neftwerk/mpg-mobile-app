import React from 'react';
import { ImageBackground } from 'react-native';

export const MenuIcon = ({
	width = 25.85,
	height = 16,
	testID,
}: {
	width?: number;
	height?: number;
	testID?: string;
}) => {
	return (
		<ImageBackground
			source={require('../png/hamburgerMenuClosedIcon.png')}
			style={{ width: width, height: height }}
			resizeMode="contain"
			testID={testID}
		/>
	);
};
