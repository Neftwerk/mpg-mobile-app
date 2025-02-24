import React from 'react';
import { ImageBackground, View } from 'react-native';

interface Props {
	children: React.ReactNode;
}

const BackgroundWrapper: React.FC<Props> = ({ children }) => {
	return (
		<View className="flex-1 absolute w-full h-full" testID="BackgroundWrapper">
			<View className="flex-1 bg-[#EEE9E7] absolute top-0 left-0 right-0 bottom-0" />
			<ImageBackground
				source={require('../../assets/png/background-pattern.png')}
				className="flex-1 w-full h-full"
				resizeMode="cover"
			>
				<View className="flex-1">{children}</View>
			</ImageBackground>
		</View>
	);
};

export default BackgroundWrapper;
