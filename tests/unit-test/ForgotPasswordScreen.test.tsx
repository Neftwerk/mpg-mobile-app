import { fireEvent, render } from '@testing-library/react-native';
import { act } from 'react';

import ForgotPasswordScreen from '@/app/(auth)/forgot-password';
import { useAuth } from '@/hooks/useAuthApi';

jest.mock('@/hooks/useAuthApi', () => ({
	useAuth: jest.fn(),
}));

describe('ForgotPasswordScreen', () => {
	const mockForgotPasswordMutation = {
		mutate: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(useAuth as jest.Mock).mockReturnValue({
			forgotPasswordMutation: mockForgotPasswordMutation,
		});
	});

	test('Should render forgot password screen correctly', async () => {
		const { findByTestId, findByText } = render(<ForgotPasswordScreen />);

		const screen = await findByTestId('forgotPasswordScreen');
		const usernameInput = await findByTestId('forgotPasswordUsernameInput');
		const sendButton = await findByText('Send Code');

		expect(screen).toBeTruthy();
		expect(usernameInput).toBeTruthy();
		expect(sendButton).toBeTruthy();
	});

	test('Should call forgot password mutation when form is submitted', async () => {
		const { findByTestId, findByText } = render(<ForgotPasswordScreen />);

		const usernameInput = await findByTestId('forgotPasswordUsernameInput');
		const sendButton = await findByText('Send Code');

		act(() => {
			fireEvent.changeText(usernameInput, 'test@example.com');
			fireEvent.press(sendButton);
		});

		expect(mockForgotPasswordMutation.mutate).toHaveBeenCalledWith(
			'test@example.com',
		);
	});
});
