import { ImageBackground } from 'react-native';

import { galleryIcon } from '../index';

export const GalleryIcon = ({
	width = 31,
	height = 27,
	testID,
}: {
	width?: number;
	height?: number;
	testID?: string;
}) => {
	return (
		<ImageBackground
			source={galleryIcon}
			style={{ width: width, height: height }}
			resizeMode="contain"
			testID={testID}
		/>
	);
};
