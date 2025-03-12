import { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import { Spinner } from '../Spinner/Spinner';

interface CustomModalProps {
	visible: boolean;
	testID?: string;
	animationType?: 'slide' | 'fade';
	title?: string;
	message?: string;
	showLoading?: boolean;
	showCloseButton?: boolean;
}

export const CustomModal = ({
	visible,
	testID,
	animationType = 'fade',
	title,
	message,
	showLoading = false,
	showCloseButton = false,
}: CustomModalProps) => {
	const [isVisible, setIsVisible] = useState(visible);

	const handleClose = () => {
		setIsVisible(false);
	};

	useEffect(() => {
		setIsVisible(visible);
	}, [visible]);

	return (
		<Modal
			visible={isVisible}
			testID={testID}
			transparent
			animationType={animationType}
		>
			<View className="flex-1 justify-center items-center bg-black/50">
				<View className="bg-white m-10 p-6 rounded-lg items-center">
					{showCloseButton && (
						<TouchableOpacity
							onPress={handleClose}
							className="absolute top-2 right-2 p-3"
							testID="closeModalButton"
						>
							<Text className="font-bold text-sm">X</Text>
						</TouchableOpacity>
					)}
					<Text className="text-lg text-center font-bold">{title}</Text>
					<Text className="text-center mt-2">{message}</Text>
					{showLoading && (
						<Spinner
							color="#000"
							size="large"
							testID="firstLoginModalSpinner"
						/>
					)}
				</View>
			</View>
		</Modal>
	);
};
