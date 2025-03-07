import { fireEvent, render } from '@testing-library/react-native';
import { act } from 'react';

import RegisterScreen from '@/app/(auth)/register';
import { useAuth } from '@/hooks/useAuthApi';

jest.mock('@/hooks/useAuthApi', () => ({
	useAuth: jest.fn(),
}));

describe('RegisterScreen', () => {
	const mockSignUpMutation = {
		mutate: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(useAuth as jest.Mock).mockReturnValue({
			signUpMutation: mockSignUpMutation,
		});
	});

	test('Should render register screen correctly', async () => {
		const { findByTestId } = render(<RegisterScreen />);

		const screen = await findByTestId('RegisterScreen');
		const usernameInput = await findByTestId('RegisterUsernameInput');
		const passwordInput = await findByTestId('RegisterPasswordInput');
		const nameInput = await findByTestId('RegisterNameInput');
		const surnameInput = await findByTestId('RegisterSurnameInput');
		const biographyInput = await findByTestId('RegisterBiographyInput');
		const submitButton = await findByTestId('RegisterSubmitButton');

		expect(screen).toBeTruthy();
		expect(usernameInput).toBeTruthy();
		expect(passwordInput).toBeTruthy();
		expect(nameInput).toBeTruthy();
		expect(surnameInput).toBeTruthy();
		expect(biographyInput).toBeTruthy();
		expect(submitButton).toBeTruthy();
	});

	test('Should call sign up mutation when form is submitted', async () => {
		const { findByTestId } = render(<RegisterScreen />);

		const usernameInput = await findByTestId('RegisterUsernameInput');
		const passwordInput = await findByTestId('RegisterPasswordInput');
		const nameInput = await findByTestId('RegisterNameInput');
		const surnameInput = await findByTestId('RegisterSurnameInput');
		const biographyInput = await findByTestId('RegisterBiographyInput');
		const submitButton = await findByTestId('RegisterSubmitButton');

		await act(async () => {
			fireEvent.changeText(usernameInput, 'test@example.com');
			fireEvent.changeText(passwordInput, 'Password.123');
			fireEvent.changeText(nameInput, 'John');
			fireEvent.changeText(surnameInput, 'Doe');
			fireEvent.changeText(biographyInput, 'Test biography');
			fireEvent.press(submitButton);
		});

		expect(mockSignUpMutation.mutate).toHaveBeenCalledWith({
			username: 'test@example.com',
			password: 'Password.123',
			name: 'John',
			surname: 'Doe',
			biography: 'Test biography',
		});
	});
});
