import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import { act } from 'react';

import * as handleConfigureRecovery from '../../utils/recovery/handleConfigureRecovery';
import * as signTransaction from '../../utils/stellar/signTransaction';
import * as getSecureStorageItem from '../../utils/storage/getSecureStorageItem';
import {
	mockAddWalletToUserResponse,
	mockCreateWalletResponse,
	mockGetMeResponse,
	mockSignInResponse,
	mockSubmitXdrResponse,
} from '../__files/mocks';

import LoginScreen from '@/app/(auth)/login';
import { NavigationRoutes } from '@/constants/navigation.routes.enum';
import { authService } from '@/services/auth/auth.service';
import { recoveryService } from '@/services/recovery/recovery.service';
import tokenStorage from '@/services/storage/token-storage';
import { submissionService } from '@/services/submission/submission.service';
import { userService } from '@/services/user/user.service';

jest.mock('expo-router', () => ({
	useRouter: jest.fn(),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
process.env.EXPO_PUBLIC_API_URL = 'http://localhost:5001';

describe('LoginScreen', () => {
	const mockPush = jest.fn();
	const mockReplace = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		(useRouter as jest.Mock).mockReturnValue({
			push: mockPush,
			replace: mockReplace,
		});
		jest.spyOn(authService, 'signIn').mockResolvedValue(mockSignInResponse);

		jest.spyOn(authService, 'getMe').mockResolvedValue(mockGetMeResponse);

		jest
			.spyOn(userService, 'createWallet')
			.mockResolvedValue(mockCreateWalletResponse);

		jest.spyOn(signTransaction, 'signTransaction').mockReturnValue('signedXdr');

		jest
			.spyOn(submissionService, 'submitXdr')
			.mockResolvedValue(mockSubmitXdrResponse);

		jest
			.spyOn(userService, 'addWalletToUser')
			.mockResolvedValue(mockAddWalletToUserResponse);

		jest
			.spyOn(handleConfigureRecovery, 'handleConfigureRecovery')
			.mockImplementationOnce(() => Promise.resolve());

		jest.spyOn(tokenStorage, 'setAccessToken').mockResolvedValue();
		jest.spyOn(tokenStorage, 'setRefreshToken').mockResolvedValue();

		jest.spyOn(recoveryService, 'sendVerificationCodes').mockResolvedValue();
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

		await act(async () => {
			fireEvent.press(registerButton);
		});

		expect(mockPush).toHaveBeenCalledWith(NavigationRoutes.SIGNUP);
	});

	test('Should navigate to forgot password screen when forgot password button is pressed', async () => {
		const { findByTestId } = render(<LoginScreen />);

		const forgotPasswordButton = await findByTestId('goToForgotPasswordButton');

		await act(async () => {
			fireEvent.press(forgotPasswordButton);
		});

		expect(mockPush).toHaveBeenCalledWith(NavigationRoutes.FORGOT_PASSWORD);
	});

	test('Should redirect to recovery screen when user deviceKey is missing after login', async () => {
		const { findByTestId } = render(<LoginScreen />, { wrapper });

		const usernameInput = await findByTestId('loginUsernameInput');
		const passwordInput = await findByTestId('loginPasswordInput');
		const loginButton = await findByTestId('loginSubmitButton');

		await act(async () => {
			fireEvent.changeText(usernameInput, 'test@example.com');
			fireEvent.changeText(passwordInput, 'Password123.');
			fireEvent.press(loginButton);
		});

		expect(mockReplace).toHaveBeenCalledWith(NavigationRoutes.RECOVERY);
	});

	test('Should redirect to home screen after a successful first login', async () => {
		jest.spyOn(getSecureStorageItem, 'default').mockResolvedValue('secretKey');

		const { findByTestId } = render(<LoginScreen />, { wrapper });

		const usernameInput = await findByTestId('loginUsernameInput');
		const passwordInput = await findByTestId('loginPasswordInput');
		const loginButton = await findByTestId('loginSubmitButton');

		await act(async () => {
			fireEvent.changeText(usernameInput, 'test@example.com');
			fireEvent.changeText(passwordInput, 'Password123.');
			fireEvent.press(loginButton);
		});

		expect(mockReplace).toHaveBeenCalledWith(NavigationRoutes.HOME);
	});
});
