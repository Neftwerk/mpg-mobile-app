import { fireEvent, render } from '@testing-library/react-native';
import { useLocalSearchParams } from 'expo-router';
import { act } from 'react';

import ConfirmPasswordScreen from '@/app/(auth)/confirm-password';
import { useAuth } from '@/hooks/useAuthApi';

jest.mock('expo-router', () => ({
	useLocalSearchParams: jest.fn(),
}));

jest.mock('@/hooks/useAuthApi', () => ({
	useAuth: jest.fn(),
}));

describe('ConfirmPasswordScreen', () => {
	const mockConfirmPasswordMutation = {
		mutate: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(useLocalSearchParams as jest.Mock).mockReturnValue({
			username: 'test@example.com',
		});
		(useAuth as jest.Mock).mockReturnValue({
			confirmPasswordMutation: mockConfirmPasswordMutation,
		});
	});

	test('Should render confirm password screen correctly', async () => {
		const { findByTestId, findByText, findByPlaceholderText } = render(
			<ConfirmPasswordScreen />,
		);

		const screen = await findByTestId('confirmPasswordScreen');
		const emailInput = await findByPlaceholderText('Enter your email');
		const passwordInput = await findByPlaceholderText(
			'Enter your new password',
		);
		const codeInput = await findByPlaceholderText('Enter the code');
		const submitButton = await findByText('Change Password');

		expect(screen).toBeTruthy();
		expect(emailInput).toBeTruthy();
		expect(passwordInput).toBeTruthy();
		expect(codeInput).toBeTruthy();
		expect(submitButton).toBeTruthy();
	});

	test('Should call confirm password mutation when form is submitted', async () => {
		const { findByPlaceholderText, findByText } = render(
			<ConfirmPasswordScreen />,
		);

		const passwordInput = await findByPlaceholderText(
			'Enter your new password',
		);
		const codeInput = await findByPlaceholderText('Enter the code');
		const submitButton = await findByText('Change Password');

		await act(() => {
			fireEvent.changeText(passwordInput, 'Newpassword123.');
			fireEvent.changeText(codeInput, '123456');
			fireEvent.press(submitButton);
		});

		expect(mockConfirmPasswordMutation.mutate).toHaveBeenCalledWith({
			username: 'test@example.com',
			newPassword: 'Newpassword123.',
			code: '123456',
		});
	});
});
