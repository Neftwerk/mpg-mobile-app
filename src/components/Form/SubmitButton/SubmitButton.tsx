import { Text, TouchableOpacity, View } from 'react-native';

import { Spinner } from '@/components/Spinner/Spinner';

interface ISubmitButtonProps {
	onPress: VoidFunction;
	testID?: string;
	label: string;
	isLoading?: boolean;
}

export const SubmitButton = ({
	onPress,
	testID,
	label,
	isLoading,
}: ISubmitButtonProps) => {
	return (
		<View className="flex flex-row justify-between items-center pt-10">
			<TouchableOpacity
				className="bg-blue-500 w-[65%] px-2 py-3 rounded-md"
				onPress={onPress}
				testID={testID}
				disabled={isLoading}
			>
				<Text className="text-white text-center">
					{isLoading ? (
						<Spinner size="large" testID="submitButtonSpinner" />
					) : (
						label
					)}
				</Text>
			</TouchableOpacity>
		</View>
	);
};
