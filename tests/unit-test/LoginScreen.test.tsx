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
	jest.setTimeout(10000);
	const mockPush = jest.fn();
	const mockSignInMutation = {
		mutate: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(useRouter as jest.Mock).mockReturnValue({ push: mockPush });
		(useAuth as jest.Mock).mockReturnValue({
			signInMutation: mockSignInMutation,
			isLoading: {
				signIn: false,
				firstLogin: false,
			},
		});
	});

	test('Should render login screen correctly', async () => {
		const { findByTestId } = render(<LoginScreen />);

		const screen = await findByTestId('loginScreen');
		const usernameInput = await findByTestId('loginUsernameInput');
		const passwordInput = await findByTestId('loginPasswordInput');
		const loginButton = await findByTestId('loginSubmitButton');
		const registerButton = await findByTestId('goToRegisterButton');
		const forgotPasswordButton = await findByTestId('goToForgotPasswordButton');

		expect(screen).toBeTruthy();
		expect(usernameInput).toBeTruthy();
		expect(passwordInput).toBeTruthy();
		expect(loginButton).toBeTruthy();
		expect(registerButton).toBeTruthy();
		expect(forgotPasswordButton).toBeTruthy();
	});

	test('Should navigate to register screen when register button is pressed', async () => {
		const { findByTestId } = render(<LoginScreen />);

		const registerButton = await findByTestId('goToRegisterButton');

		await act(() => {
			fireEvent.press(registerButton);
		});

		expect(mockPush).toHaveBeenCalledWith(NavigationRoutes.SIGNUP);
	});

	test('Should navigate to forgot password screen when forgot password button is pressed', async () => {
		const { findByTestId } = render(<LoginScreen />);

		const forgotPasswordButton = await findByTestId('goToForgotPasswordButton');

		await act(() => {
			fireEvent.press(forgotPasswordButton);
		});

		expect(mockPush).toHaveBeenCalledWith(NavigationRoutes.FORGOT_PASSWORD);
	});

	test('Should call sign in mutation when form is submitted', async () => {
		const { findByTestId } = render(<LoginScreen />);

		const usernameInput = await findByTestId('loginUsernameInput');
		const passwordInput = await findByTestId('loginPasswordInput');
		const loginButton = await findByTestId('loginSubmitButton');

		await act(() => {
			fireEvent.changeText(usernameInput, 'test@example.com');
			fireEvent.changeText(passwordInput, 'Password123.');
			fireEvent.press(loginButton);
		});

		expect(mockSignInMutation.mutate).toHaveBeenCalledWith({
			username: 'test@example.com',
			password: 'Password123.',
		});
	});

	test('Should show loading state during sign in', async () => {
		(useAuth as jest.Mock).mockReturnValue({
			signInMutation: mockSignInMutation,
			isLoading: {
				signIn: true,
				firstLogin: false,
			},
		});

		const { findByTestId } = render(<LoginScreen />);
		const loginButton = await findByTestId('loginSubmitButton');
		expect(loginButton.props.accessibilityState.disabled).toBeTruthy();
	});

	test('Should show first login modal when creating wallet', async () => {
		(useAuth as jest.Mock).mockReturnValue({
			signInMutation: mockSignInMutation,
			isLoading: {
				signIn: false,
				firstLogin: true,
			},
		});

		const { findByTestId } = render(<LoginScreen />);
		const firstLoginModal = await findByTestId('firstLoginModal');

		expect(firstLoginModal).toBeTruthy();
	});
});
