import { ActivityIndicator } from 'react-native';

interface ISpinnerProps {
	size?: 'small' | 'large';
	color?: string;
	testID: string;
}

export const Spinner = ({
	size = 'large',
	color = '#000',
	testID,
}: ISpinnerProps) => {
	return <ActivityIndicator size={size} color={color} testID={testID} />;
};
