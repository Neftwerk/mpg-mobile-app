import { Href, Redirect } from 'expo-router';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import { BackgroundWrapper } from '@/components/BackgroundWrapper/BackgroundWrapper';
import { NavigationRoutes } from '@/constants/navigation.routes.enum';
import { AuthContext } from '@/context/auth.context';

const GalleryScreen = () => {
	const { isAuthenticated } = useContext(AuthContext);
	if (!isAuthenticated) {
		return <Redirect href={NavigationRoutes.LOGIN as Href} />;
	}
	return (
		<BackgroundWrapper>
			<View
				testID="GalleryScreen"
				className="flex-1 justify-center items-center bg-transparent"
			>
				<Text testID="GalleryScreenText">Gallery</Text>
			</View>
		</BackgroundWrapper>
	);
};

export default GalleryScreen;
