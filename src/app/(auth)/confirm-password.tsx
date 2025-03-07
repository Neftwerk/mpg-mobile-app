import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { BackgroundWrapper } from '@/components/BackgroundWrapper/BackgroundWrapper';
import { CustomInput } from '@/components/Form/CustomInput/CustomInput';
import { SubmitButton } from '@/components/Form/SubmitButton/SubmitButton';
import { confirmPasswordInputs } from '@/constants/auth-inputs.constant';
import { useAuth } from '@/hooks/useAuthApi';
import { IConfirmPasswordRequest } from '@/interfaces/api/api';
import { confirmPasswordSchema } from '@/validation/schema/auth.schema';

const ConfirmPasswordScreen = () => {
	const { username } = useLocalSearchParams();
	const { confirmPasswordMutation } = useAuth();
	const { control, handleSubmit } = useForm<IConfirmPasswordRequest>({
		defaultValues: {
			username: (username as string) || '',
			newPassword: '',
			code: '',
		},
		resolver: yupResolver(confirmPasswordSchema),
	});

	const onSubmit = (data: IConfirmPasswordRequest) => {
		confirmPasswordMutation.mutate(data);
	};

	return (
		<BackgroundWrapper>
			<View
				testID="ConfirmPasswordScreen"
				className="flex top-1/4 justify-center items-center bg-white mx-8 pb-4 rounded-lg"
			>
				<Text
					className="text-2xl font-bold pt-4"
					testID="ConfirmPasswordScreenTitle"
				>
					Confirm Password
				</Text>
				<Text className="text-sm text-gray-500 pt-4">
					Enter the code sent to your email
				</Text>
				{confirmPasswordInputs.map(
					({
						label,
						placeholder,
						name,
						maxLength,
						secureTextEntry,
						testID,
					}) => (
						<CustomInput
							key={name}
							label={label}
							placeholder={placeholder}
							name={name}
							control={control}
							maxLength={maxLength}
							secureTextEntry={secureTextEntry}
							testID={testID}
						/>
					),
				)}
				<SubmitButton
					label="Change Password"
					onPress={handleSubmit(onSubmit)}
					testID="ConfirmPasswordSubmitButton"
				/>
			</View>
		</BackgroundWrapper>
	);
};

export default ConfirmPasswordScreen;
