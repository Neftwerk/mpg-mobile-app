import { router } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

export const BackButton = ({
	returnType,
	className,
}: {
	returnType: 'back' | 'dismiss';
	className?: string;
}) => {
	return (
		<TouchableOpacity
			onPress={() => (returnType === 'back' ? router.back() : router.dismiss())}
			testID="GoBackButton"
		>
			<Text className={`text-4xl ${className}`}>←</Text>
		</TouchableOpacity>
	);
};
