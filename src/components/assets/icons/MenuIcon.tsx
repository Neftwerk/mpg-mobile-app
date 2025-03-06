import { ImageBackground } from 'react-native';

import { menuIcon } from '../index';

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
			source={menuIcon}
			style={{ width: width, height: height }}
			resizeMode="contain"
			testID={testID}
		/>
	);
};
