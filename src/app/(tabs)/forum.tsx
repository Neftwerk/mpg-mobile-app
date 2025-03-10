import { Text, View } from 'react-native';

import { BackgroundWrapper } from '@/components/BackgroundWrapper/BackgroundWrapper';

const ForumScreen = () => {
	return (
		<BackgroundWrapper>
			<View
				testID="forumScreen"
				className="flex-1 justify-center items-center bg-transparent"
			>
				<Text testID="forumScreenText">Forum</Text>
			</View>
		</BackgroundWrapper>
	);
};

export default ForumScreen;
