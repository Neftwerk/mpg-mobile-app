import * as React from 'react';
import { ImageBackground } from 'react-native';

export const ProfileIcon = ({
	width = 26,
	height = 30,
	testID,
}: {
	width?: number;
	height?: number;
	testID?: string;
}) => (
	<ImageBackground
		source={require('../png/profileIcon.png')}
		style={{ width: width, height: height }}
		resizeMode="contain"
		testID={testID}
	/>
);
