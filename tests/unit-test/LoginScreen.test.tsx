import { fireEvent, render } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import { act } from 'react';

import LoginScreen from '@/app/(auth)/login';
import { NavigationRoutes } from '@/constants/navigation.routes.enum';
import { useAuth } from '@/hooks/useAuthApi';

jest.mock('expo-router', () => ({
	useRouter: jest.fn(),
}));

jest.mock('@/hooks/useAuthApi', () => ({
	useAuth: jest.fn(),
}));

describe('LoginScreen', () => {
	const mockPush = jest.fn();
	const mockSignInMutation = {
		mutate: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(useRouter as jest.Mock).mockReturnValue({ push: mockPush });
		(useAuth as jest.Mock).mockReturnValue({
			signInMutation: mockSignInMutation,
		});
	});

	test('Should render login screen correctly', async () => {
		const { findByTestId } = render(<LoginScreen />);

		const screen = await findByTestId('LoginScreen');
		const usernameInput = await findByTestId('LoginUsernameInput');
		const passwordInput = await findByTestId('LoginPasswordInput');
		const loginButton = await findByTestId('LoginSubmitButton');
		const registerButton = await findByTestId('GoToRegisterButton');
		const forgotPasswordButton = await findByTestId('GoToForgotPasswordButton');

		expect(screen).toBeTruthy();
		expect(usernameInput).toBeTruthy();
		expect(passwordInput).toBeTruthy();
		expect(loginButton).toBeTruthy();
		expect(registerButton).toBeTruthy();
		expect(forgotPasswordButton).toBeTruthy();
	});

	test('Should navigate to register screen when register button is pressed', async () => {
		const { findByTestId } = render(<LoginScreen />);

		const registerButton = await findByTestId('GoToRegisterButton');

		await act(async () => {
			fireEvent.press(registerButton);
		});

		expect(mockPush).toHaveBeenCalledWith(NavigationRoutes.SIGNUP);
	});

	test('Should navigate to forgot password screen when forgot password button is pressed', async () => {
		const { findByTestId } = render(<LoginScreen />);

		const forgotPasswordButton = await findByTestId('GoToForgotPasswordButton');

		await act(async () => {
			fireEvent.press(forgotPasswordButton);
		});

		expect(mockPush).toHaveBeenCalledWith(NavigationRoutes.FORGOT_PASSWORD);
	});

	test('Should call sign in mutation when form is submitted', async () => {
		const { findByTestId } = render(<LoginScreen />);

		const usernameInput = await findByTestId('LoginUsernameInput');
		const passwordInput = await findByTestId('LoginPasswordInput');
		const loginButton = await findByTestId('LoginSubmitButton');

		await act(async () => {
			fireEvent.changeText(usernameInput, 'test@example.com');
			fireEvent.changeText(passwordInput, 'password123');
			fireEvent.press(loginButton);
		});

		expect(mockSignInMutation.mutate).toHaveBeenCalledWith({
			username: 'test@example.com',
			password: 'password123',
		});
	});
});
