import * as React from 'react';
import { ImageBackground } from 'react-native';

import { profileIcon } from '../index';

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
		source={profileIcon}
		style={{ width: width, height: height }}
		resizeMode="contain"
		testID={testID}
	/>
);
