import { ImageBackground } from 'react-native';

import { galleryIcon } from '../index';

interface IGalleryIconProps {
	width?: number;
	height?: number;
	testID?: string;
}

export const GalleryIcon = ({
	width = 31,
	height = 27,
	testID,
}: IGalleryIconProps) => {
	return (
		<ImageBackground
			source={galleryIcon}
			style={{ width: width, height: height }}
			resizeMode="contain"
			testID={testID}
		/>
	);
};
