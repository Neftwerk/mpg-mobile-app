import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { BackgroundWrapper } from '@/components/BackgroundWrapper/BackgroundWrapper';
import { CustomInput } from '@/components/Form/CustomInput/CustomInput';
import { SubmitButton } from '@/components/Form/SubmitButton/SubmitButton';
import { useAuth } from '@/hooks/useAuthApi';
import { IForgotPasswordRequest } from '@/interfaces/api/api';
import { forgotPasswordSchema } from '@/validation/schema/auth.schema';

const ForgotPasswordScreen = () => {
	const { forgotPasswordMutation } = useAuth();
	const { control, handleSubmit } = useForm<IForgotPasswordRequest>({
		defaultValues: {
			username: '',
		},
		resolver: yupResolver(forgotPasswordSchema),
	});
	const onSubmit = ({ username }: IForgotPasswordRequest) => {
		forgotPasswordMutation.mutate(username);
	};

	return (
		<BackgroundWrapper>
			<View
				testID="ForgotPasswordScreen"
				className="flex top-1/4 justify-center items-center bg-white mx-8 pb-4 rounded-lg"
			>
				<Text
					className="text-2xl font-bold pt-4"
					testID="ForgotPasswordScreenTitle"
				>
					Forgot Password
				</Text>
				<CustomInput
					label="Email"
					placeholder="Enter your email"
					name="username"
					control={control}
					testID="ForgotPasswordUsernameInput"
				/>

				<SubmitButton
					label="Send Code"
					onPress={handleSubmit(onSubmit)}
					testID="ForgotPasswordSubmitButton"
				/>
			</View>
		</BackgroundWrapper>
	);
};

export default ForgotPasswordScreen;
