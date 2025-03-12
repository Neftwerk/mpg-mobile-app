import { yupResolver } from '@hookform/resolvers/yup';
import { Href } from 'expo-router';
import { useForm } from 'react-hook-form';
import { KeyboardTypeOptions, Text, View } from 'react-native';

import { BackgroundWrapper } from '@/components/BackgroundWrapper/BackgroundWrapper';
import { CustomModal } from '@/components/CustomModal/CustomModal';
import { CustomInput } from '@/components/Form/CustomInput/CustomInput';
import { SubmitButton } from '@/components/Form/SubmitButton/SubmitButton';
import { GoToScreenButton } from '@/components/GoToScreenButton/GoToScreenButton';
import { loginInputs } from '@/constants/auth-inputs.constant';
import { FIRST_LOGIN_MODAL } from '@/constants/first-login-modal.constant';
import { NavigationRoutes } from '@/constants/navigation.routes.enum';
import { useAuth } from '@/hooks/useAuthApi';
import { ISignInRequest } from '@/interfaces/api/api';
import { loginSchema } from '@/validation/schema/auth.schema';

const LoginScreen = () => {
	const { signInMutation, isLoading } = useAuth();
	const defaultValues: ISignInRequest = {
		username: '',
		password: '',
	};
	const { control, handleSubmit } = useForm<ISignInRequest>({
		defaultValues,
		resolver: yupResolver(loginSchema),
	});
	const onSubmit = (data: ISignInRequest) => {
		signInMutation.mutate(data);
	};

	return (
		<BackgroundWrapper>
			<View
				testID="loginScreen"
				className="flex top-1/4 justify-center items-center bg-white mx-8 pb-4 rounded-lg"
			>
				<Text className="text-2xl font-bold pt-4" testID="loginScreenTitle">
					Login
				</Text>

				{loginInputs.map(
					({
						label,
						placeholder,
						name,
						secureTextEntry,
						keyboardType,
						testID,
					}) => (
						<CustomInput
							key={name}
							label={label}
							placeholder={placeholder}
							name={name as keyof ISignInRequest}
							control={control}
							secureTextEntry={secureTextEntry}
							keyboardType={keyboardType as KeyboardTypeOptions}
							testID={testID}
						/>
					),
				)}

				<SubmitButton
					label="Login"
					testID="loginSubmitButton"
					onPress={handleSubmit(onSubmit)}
					isLoading={isLoading.signIn}
				/>

				<View className="flex w-full flex-row justify-between items-center mt-8">
					<GoToScreenButton
						label="Register"
						route={NavigationRoutes.SIGNUP as Href}
						testID="goToRegisterButton"
						className="pl-8"
					/>
					<GoToScreenButton
						label="Forgot password?"
						route={NavigationRoutes.FORGOT_PASSWORD as Href}
						testID="goToForgotPasswordButton"
						className="pr-8"
					/>
				</View>
			</View>

			<CustomModal
				visible={isLoading.firstLogin}
				title={FIRST_LOGIN_MODAL.TITLE}
				message={FIRST_LOGIN_MODAL.MESSAGE}
				showLoading={true}
				testID={FIRST_LOGIN_MODAL.TEST_ID}
			/>
		</BackgroundWrapper>
	);
};

export default LoginScreen;
