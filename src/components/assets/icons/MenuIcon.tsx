import { ImageBackground } from 'react-native';

import { menuIcon } from '../index';

interface IMenuIconProps {
	width?: number;
	height?: number;
	testID?: string;
}

export const MenuIcon = ({
	width = 25.85,
	height = 16,
	testID,
}: IMenuIconProps) => {
	return (
		<ImageBackground
			source={menuIcon}
			style={{ width: width, height: height }}
			resizeMode="contain"
			testID={testID}
		/>
	);
};
