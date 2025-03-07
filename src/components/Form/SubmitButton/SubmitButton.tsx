import { Text, TouchableOpacity, View } from 'react-native';

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
				className="bg-blue-500 w-[65%] p-2 rounded-md"
				onPress={onPress}
				testID={testID}
				disabled={isLoading}
			>
				<Text className="text-white text-center">
					{isLoading ? 'Loading...' : label}
				</Text>
			</TouchableOpacity>
		</View>
	);
};
