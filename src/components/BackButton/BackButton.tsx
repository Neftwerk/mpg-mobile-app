import { router } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

import { GoToBackButtonType } from '@/types/enum/go-to-back-button-type.enum';

interface IBackButtonProps {
	returnType: GoToBackButtonType;
	className?: string;
}

export const BackButton = ({ returnType, className }: IBackButtonProps) => {
	return (
		<TouchableOpacity
			onPress={() =>
				returnType === GoToBackButtonType.BACK
					? router.back()
					: router.dismiss()
			}
			testID="goBackButton"
		>
			<Text className={`text-4xl ${className}`}>←</Text>
		</TouchableOpacity>
	);
};
