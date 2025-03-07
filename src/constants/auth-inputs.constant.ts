import { ISignUpRequest } from '@/interfaces/api/api';

export const confirmPasswordInputs = [
	{
		label: 'Email',
		placeholder: 'Enter your email',
		name: 'username' as const,
		testID: 'ConfirmPasswordUsernameInput',
	},
	{
		label: 'New Password',
		placeholder: 'Enter your new password',
		name: 'newPassword' as const,
		secureTextEntry: true,
		testID: 'ConfirmPasswordNewPasswordInput',
	},
	{
		label: 'Code',
		placeholder: 'Enter the code',
		name: 'code' as const,
		maxLength: 6,
		testID: 'ConfirmPasswordCodeInput',
	},
];

export const confirmUserInputs = [
	{
		label: 'Email',
		placeholder: 'Enter your email',
		name: 'username' as const,
		testID: 'ConfirmUserUsernameInput',
	},
	{
		label: 'Code',
		placeholder: 'Enter your code',
		name: 'code' as const,
		maxLength: 6,
		testID: 'ConfirmUserCodeInput',
	},
];

export const loginInputs = [
	{
		label: 'Email',
		placeholder: 'Enter your email',
		name: 'username',
		keyboardType: 'email-address',
		testID: 'LoginUsernameInput',
	},
	{
		label: 'Password',
		placeholder: 'Enter your password',
		name: 'password',
		secureTextEntry: true,
		testID: 'LoginPasswordInput',
	},
];

export const registerInputs = [
	{
		label: 'Email',
		placeholder: 'Enter your email',
		name: 'username' as const,
		keyboardType: 'email-address',
		testID: 'RegisterUsernameInput',
	},
	{
		label: 'Password',
		placeholder: 'Enter your password',
		name: 'password' as const,
		secureTextEntry: true,
		testID: 'RegisterPasswordInput',
	},
	{
		label: 'Name',
		placeholder: 'Enter your name',
		name: 'name' as const,
		testID: 'RegisterNameInput',
	},
	{
		label: 'Surname',
		placeholder: 'Enter your surname',
		name: 'surname' as const,
		testID: 'RegisterSurnameInput',
	},
	{
		label: 'Biography',
		placeholder: 'Enter your biography',
		name: 'biography' as const,
		multiline: true,
		maxLength: 255,
		numberOfLines: 4,
		testID: 'RegisterBiographyInput',
	},
];

export const registerUserDefaultValues: ISignUpRequest = {
	username: '',
	password: '',
	name: '',
	surname: '',
	biography: '',
};
