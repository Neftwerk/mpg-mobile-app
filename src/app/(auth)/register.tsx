import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { BackgroundWrapper } from '@/components/BackgroundWrapper/BackgroundWrapper';
import { CustomInput } from '@/components/Form/CustomInput/CustomInput';
import { SubmitButton } from '@/components/Form/SubmitButton/SubmitButton';
import {
	registerInputs,
	registerUserDefaultValues,
} from '@/constants/auth-inputs.constant';
import { useAuth } from '@/hooks/useAuthApi';
import { ISignUpRequest } from '@/interfaces/api/api';
import { signUpSchema } from '@/validation/schema/auth.schema';

const RegisterScreen = () => {
	const { signUpMutation } = useAuth();

	const {
		control,
		handleSubmit,
		formState: { isLoading },
	} = useForm<ISignUpRequest>({
		defaultValues: registerUserDefaultValues,
		resolver: yupResolver(signUpSchema),
	});
	const onSubmit = (data: ISignUpRequest) => {
		signUpMutation.mutate(data);
	};

	return (
		<BackgroundWrapper>
			<View
				testID="registerScreen"
				className="flex justify-center items-center bg-white rounded-lg mt-36 mx-8 pb-10"
			>
				<Text className="text-2xl font-bold pt-4" testID="registerScreenTitle">
					Register
				</Text>
				{registerInputs.map(
					({
						label,
						placeholder,
						name,
						secureTextEntry,
						multiline,
						maxLength,
						numberOfLines,
						testID,
					}) => (
						<CustomInput
							key={name}
							label={label}
							placeholder={placeholder}
							name={name as keyof ISignUpRequest}
							control={control}
							secureTextEntry={secureTextEntry}
							multiline={multiline}
							maxLength={maxLength}
							numberOfLines={numberOfLines}
							testID={testID}
						/>
					),
				)}

				<SubmitButton
					onPress={handleSubmit(onSubmit)}
					label="Create account"
					isLoading={isLoading}
					testID="registerSubmitButton"
				/>
			</View>
		</BackgroundWrapper>
	);
};

export default RegisterScreen;
