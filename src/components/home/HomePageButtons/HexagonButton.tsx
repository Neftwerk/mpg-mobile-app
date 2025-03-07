import { Href, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import { HexagonContainer } from './HexagonContainer';

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
	route?: string;
	testId?: string;
}

export const HexagonButton: React.FC<HexagonCardProps> = ({
	icon,
	label,
	width,
	height,
	route,
	testId,
}) => {
	const router = useRouter();
	return (
		<View className="flex w-[140px] h-[155px] relative" testID={testId}>
			<HexagonContainer />
			<TouchableOpacity
				activeOpacity={0.8}
				className="absolute top-1/2 left-0 right-0 flex-col items-center"
				style={{ transform: [{ translateY: -40 }, { translateX: -9 }] }}
				onPress={() => route && router.push(route as Href)}
				testID={`${testId}Button`}
			>
				{icon({ width, height })}
				<Text className="mt-2 text-blue-800 font-medium">{label}</Text>
			</TouchableOpacity>
		</View>
	);
};
