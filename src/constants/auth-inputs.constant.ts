import { ISignUpRequest } from '@/interfaces/api/api';

export const confirmPasswordInputs = [
	{
		label: 'Email',
		placeholder: 'Enter your email',
		name: 'username',
		testID: 'confirmPasswordUsernameInput',
	},
	{
		label: 'New Password',
		placeholder: 'Enter your new password',
		name: 'newPassword',
		secureTextEntry: true,
		testID: 'confirmPasswordNewPasswordInput',
	},
	{
		label: 'Code',
		placeholder: 'Enter the code',
		name: 'code',
		maxLength: 6,
		testID: 'confirmPasswordCodeInput',
	},
];

export const confirmUserInputs = [
	{
		label: 'Email',
		placeholder: 'Enter your email',
		name: 'username',
		testID: 'confirmUserUsernameInput',
	},
	{
		label: 'Code',
		placeholder: 'Enter your code',
		name: 'code',
		maxLength: 6,
		testID: 'confirmUserCodeInput',
	},
];

export const loginInputs = [
	{
		label: 'Email',
		placeholder: 'Enter your email',
		name: 'username',
		keyboardType: 'email-address',
		testID: 'loginUsernameInput',
	},
	{
		label: 'Password',
		placeholder: 'Enter your password',
		name: 'password',
		secureTextEntry: true,
		testID: 'loginPasswordInput',
	},
];

export const registerInputs = [
	{
		label: 'Email',
		placeholder: 'Enter your email',
		name: 'username',
		keyboardType: 'email-address',
		testID: 'registerUsernameInput',
	},
	{
		label: 'Password',
		placeholder: 'Enter your password',
		name: 'password',
		secureTextEntry: true,
		testID: 'registerPasswordInput',
	},
	{
		label: 'Name',
		placeholder: 'Enter your name',
		name: 'name',
		testID: 'registerNameInput',
	},
	{
		label: 'Surname',
		placeholder: 'Enter your surname',
		name: 'surname',
		testID: 'registerSurnameInput',
	},
	{
		label: 'Biography',
		placeholder: 'Enter your biography',
		name: 'biography',
		multiline: true,
		maxLength: 255,
		numberOfLines: 4,
		testID: 'registerBiographyInput',
	},
];

export const registerUserDefaultValues: ISignUpRequest = {
	username: '',
	password: '',
	name: '',
	surname: '',
	biography: '',
};
