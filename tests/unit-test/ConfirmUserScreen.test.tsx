import { fireEvent, render } from '@testing-library/react-native';
import { useLocalSearchParams } from 'expo-router';
import { act } from 'react';

import ConfirmUserScreen from '@/app/(auth)/confirm-user';
import { useAuth } from '@/hooks/useAuthApi';

jest.mock('expo-router', () => ({
	useLocalSearchParams: jest.fn(),
}));

jest.mock('@/hooks/useAuthApi', () => ({
	useAuth: jest.fn(),
}));

describe('ConfirmUserScreen', () => {
	const mockConfirmUserMutation = {
		mutate: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(useLocalSearchParams as jest.Mock).mockReturnValue({
			username: 'test@example.com',
		});
		(useAuth as jest.Mock).mockReturnValue({
			confirmUserMutation: mockConfirmUserMutation,
		});
	});

	test('Should render confirm user screen correctly', async () => {
		const { findByTestId, findByPlaceholderText, findByText } = render(
			<ConfirmUserScreen />,
		);

		const screen = await findByTestId('ConfirmUserScreen');
		const emailInput = await findByPlaceholderText('Enter your email');
		const codeInput = await findByPlaceholderText('Enter your code');
		const confirmButton = await findByText('Confirm User');

		expect(screen).toBeTruthy();
		expect(emailInput).toBeTruthy();
		expect(codeInput).toBeTruthy();
		expect(confirmButton).toBeTruthy();
	});

	test('Should call confirm user mutation when form is submitted', async () => {
		const { findByPlaceholderText, findByText } = render(<ConfirmUserScreen />);

		const codeInput = await findByPlaceholderText('Enter your code');
		const confirmButton = await findByText('Confirm');

		await act(async () => {
			fireEvent.changeText(codeInput, '123456');
			fireEvent.press(confirmButton);
		});

		expect(mockConfirmUserMutation.mutate).toHaveBeenCalledWith({
			username: 'test@example.com',
			code: '123456',
		});
	});
});
