import React from 'react';
import { ImageBackground } from 'react-native';

export const ArrowBackIcon = () => {
	return (
		<ImageBackground
			source={require('../png/arrowBackIcon.png')}
			style={{ width: 18, height: 14, marginLeft: 5, marginRight: 5 }}
		/>
	);
};
