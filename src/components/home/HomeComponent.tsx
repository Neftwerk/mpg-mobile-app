import { ScrollView, View } from 'react-native';

import { HomePageButtonsComponent } from './HomePageButtons/HomePageButtonsComponent';

export const HomeComponent = () => {
	return (
		<ScrollView>
			<View testID="homeScreen">
				<HomePageButtonsComponent />
			</View>
		</ScrollView>
	);
};
