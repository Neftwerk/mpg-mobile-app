import { router } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

interface IBackButtonProps {
	returnType: 'back' | 'dismiss';
	className?: string;
}

export const BackButton = ({ returnType, className }: IBackButtonProps) => {
	return (
		<TouchableOpacity
			onPress={() => (returnType === 'back' ? router.back() : router.dismiss())}
			testID="goBackButton"
		>
			<Text className={`text-4xl ${className}`}>←</Text>
		</TouchableOpacity>
	);
};
