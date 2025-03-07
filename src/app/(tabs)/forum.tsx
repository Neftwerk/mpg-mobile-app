import { Text, View } from 'react-native';

import { BackgroundWrapper } from '@/components/BackgroundWrapper/BackgroundWrapper';

const ForumScreen = () => {
	return (
		<BackgroundWrapper>
			<View
				testID="ForumScreen"
				className="flex-1 justify-center items-center bg-transparent"
			>
				<Text testID="ForumScreenText">Forum</Text>
			</View>
		</BackgroundWrapper>
	);
};

export default ForumScreen;
