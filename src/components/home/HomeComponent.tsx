import React from 'react';
import { ScrollView, View } from 'react-native';

import { HomePageButtonsComponent } from './HomePageButtons/HomePageButtonsComponent';

export const HomeComponent = () => {
	return (
		<ScrollView>
			<View testID="HomeScreen">
				<HomePageButtonsComponent />
			</View>
		</ScrollView>
	);
};
