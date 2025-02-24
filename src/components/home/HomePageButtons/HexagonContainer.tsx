import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface HexagonCardProps {
	icon: ({
		width,
		height,
	}: {
		width?: number;
		height?: number;
	}) => React.JSX.Element;
	width?: number;
	height?: number;
	label: string;
	onPress: () => void;
	testId?: string;
}

const HexagonContainer: React.FC<HexagonCardProps> = ({
	icon,
	label,
	width,
	height,
	onPress,
	testId,
}) => {
	return (
		<View className="flex w-[140px] h-[155px] relative" testID={testId}>
			<Svg
				width="140"
				height="155"
				viewBox="0 0 140 155"
				fill="none"
				style={{ position: 'absolute' }}
			>
				<Path
					d="M110.128 32.272C113.214 34.0604 115.114 37.3573 115.114 40.9243V93.7348C115.114 97.3018 113.214 100.599 110.128 102.387L64.6276 128.754C61.5266 130.551 57.701 130.551 54.5999 128.754L9.09993 102.387C6.01372 100.599 4.11377 97.3018 4.11377 93.7348V40.9243C4.11377 37.3573 6.01372 34.0604 9.09992 32.272L54.5999 5.90545C57.701 4.10845 61.5266 4.10844 64.6276 5.90545L110.128 32.272Z"
					fill="#E5DED9"
					opacity="0.5"
					transform="translate(6,6)"
				/>

				<Path
					d="M110.128 32.272C113.214 34.0604 115.114 37.3573 115.114 40.9243V93.7348C115.114 97.3018 113.214 100.599 110.128 102.387L64.6276 128.754C61.5266 130.551 57.701 130.551 54.5999 128.754L9.09993 102.387C6.01372 100.599 4.11377 97.3018 4.11377 93.7348V40.9243C4.11377 37.3573 6.01372 34.0604 9.09992 32.272L54.5999 5.90545C57.701 4.10845 61.5266 4.10844 64.6276 5.90545L110.128 32.272Z"
					fill="#FFFFFF"
					opacity="0.1"
					transform="translate(4,4)"
				/>
				<Path
					d="M110.128 32.272C113.214 34.0604 115.114 37.3573 115.114 40.9243V93.7348C115.114 97.3018 113.214 100.599 110.128 102.387L64.6276 128.754C61.5266 130.551 57.701 130.551 54.5999 128.754L9.09993 102.387C6.01372 100.599 4.11377 97.3018 4.11377 93.7348V40.9243C4.11377 37.3573 6.01372 34.0604 9.09992 32.272L54.5999 5.90545C57.701 4.10845 61.5266 4.10844 64.6276 5.90545L110.128 32.272Z"
					fill="#F2F3F7"
					stroke="#EBEBEB"
					strokeWidth={0.4}
				/>
			</Svg>
			<TouchableOpacity
				activeOpacity={0.8}
				className="absolute top-1/2 left-0 right-0 flex-col items-center"
				style={{ transform: [{ translateY: -40 }, { translateX: -9 }] }}
				onPress={onPress}
				testID={`${testId}Button`}
			>
				{icon({ width, height })}
				<Text className="mt-2 text-blue-800 font-medium">{label}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default HexagonContainer;
