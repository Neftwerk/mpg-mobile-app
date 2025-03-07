import { Href, useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

export const GoToScreenButton = ({
	label,
	route,
	testID,
	className,
}: {
	label: string;
	route: Href;
	testID: string;
	className?: string;
}) => {
	const router = useRouter();
	return (
		<TouchableOpacity testID={testID} onPress={() => router.push(route)}>
			<Text className={`${className} text-blue-500`}>{label}</Text>
		</TouchableOpacity>
	);
};
