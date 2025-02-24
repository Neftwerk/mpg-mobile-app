import React from 'react';
import { ImageBackground } from 'react-native';

export const GalleryIcon = ({
	width = 31,
	height = 27,
}: {
	width?: number;
	height?: number;
}) => {
	return (
		<ImageBackground
			source={require('../png/galleryIcon.png')}
			style={{ width: width, height: height }}
			resizeMode="contain"
		/>
	);
};
