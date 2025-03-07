import { Text, View } from 'react-native';

import { BackgroundWrapper } from '@/components/BackgroundWrapper/BackgroundWrapper';

const DiscoverScreen = () => {
	return (
		<BackgroundWrapper>
			<View
				testID="DiscoverScreen"
				className="flex-1 justify-center items-center bg-transparent"
			>
				<Text testID="DiscoverScreenText">Discover</Text>
			</View>
		</BackgroundWrapper>
	);
};

export default DiscoverScreen;
