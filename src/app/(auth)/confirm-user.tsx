import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { BackgroundWrapper } from '@/components/BackgroundWrapper/BackgroundWrapper';
import { CustomInput } from '@/components/Form/CustomInput/CustomInput';
import { SubmitButton } from '@/components/Form/SubmitButton/SubmitButton';
import { confirmUserInputs } from '@/constants/auth-inputs.constant';
import { useAuth } from '@/hooks/useAuthApi';
import { IConfirmUserRequest } from '@/interfaces/api/api';
import { confirmUserSchema } from '@/validation/schema/auth.schema';

const ConfirmUserScreen = () => {
	const { username } = useLocalSearchParams();
	const { confirmUserMutation } = useAuth();

	const { control, handleSubmit } = useForm<IConfirmUserRequest>({
		defaultValues: {
			username: (username as string) || '',
			code: '',
		},
		resolver: yupResolver(confirmUserSchema),
	});

	const onSubmit = (data: IConfirmUserRequest) => {
		confirmUserMutation.mutate(data);
	};

	return (
		<BackgroundWrapper>
			<View
				testID="confirmUserScreen"
				className="flex top-1/4 justify-center items-center bg-white rounded-lg mx-8 pb-4"
			>
				<View className="flex justify-center items-center pb-10">
					<Text
						className="text-2xl font-bold pt-4"
						testID="confirmUserScreenTitle"
					>
						Confirm User
					</Text>
					<Text className="text-sm font-medium py-2">
						Enter the code sent to your email
					</Text>
				</View>

				{confirmUserInputs.map(
					({ label, placeholder, name, maxLength, testID }) => (
						<CustomInput
							key={name}
							label={label}
							placeholder={placeholder}
							name={name as keyof IConfirmUserRequest}
							control={control}
							maxLength={maxLength}
							testID={testID}
						/>
					),
				)}
				<SubmitButton
					label="Confirm"
					onPress={handleSubmit(onSubmit)}
					testID="confirmUserSubmitButton"
				/>
			</View>
		</BackgroundWrapper>
	);
};

export default ConfirmUserScreen;
