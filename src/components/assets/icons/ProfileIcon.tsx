import * as React from 'react';
import { ImageBackground } from 'react-native';

import { profileIcon } from '../index';

interface IProfileIconProps {
	width?: number;
	height?: number;
	testID?: string;
}

export const ProfileIcon = ({
	width = 26,
	height = 30,
	testID,
}: IProfileIconProps) => (
	<ImageBackground
		source={profileIcon}
		style={{ width: width, height: height }}
		resizeMode="contain"
		testID={testID}
	/>
);
