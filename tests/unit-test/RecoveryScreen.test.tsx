import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import { act } from 'react';

import * as handleStoreDeviceSecretKey from '../../utils/handleDeviceSecretKey';
import {
	mockAuthenticateWithVerificationCodeResponse,
	mockGenerateServersSignaturesResponse,
	mockRecoverAccountResponse,
	mockSubmitXdrResponse,
} from '../__files/mocks';

import RecoverAccountScreen from '@/app/(recovery)/recover-account';
import { NavigationRoutes } from '@/constants/navigation.routes.enum';
import { useAuthContext } from '@/context/auth.context';
import { recoveryService } from '@/services/recovery/recovery.service';
import { submissionService } from '@/services/submission/submission.service';

jest.mock('expo-router', () => ({
	useRouter: jest.fn(),
}));

jest.mock('@/context/auth.context', () => ({
	useAuthContext: jest.fn(),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('RecoverAccountScreen', () => {
	const mockPush = jest.fn();
	const mockReplace = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		(useRouter as jest.Mock).mockReturnValue({
			push: mockPush,
			replace: mockReplace,
		});
		(useAuthContext as jest.Mock).mockReturnValue({
			user: {
				deviceSecretKey: 'secretKey',
			},
			setIsAuthenticated: jest.fn(),
		});

		jest
			.spyOn(recoveryService, 'authenticateWithVerificationCode')
			.mockResolvedValue(mockAuthenticateWithVerificationCodeResponse);

		jest
			.spyOn(recoveryService, 'recoverAccount')
			.mockResolvedValue(mockRecoverAccountResponse);

		jest
			.spyOn(recoveryService, 'generateServersSignatures')
			.mockResolvedValue(mockGenerateServersSignaturesResponse);

		jest
			.spyOn(submissionService, 'submitXdr')
			.mockResolvedValue(mockSubmitXdrResponse);

		jest
			.spyOn(handleStoreDeviceSecretKey, 'storeDeviceSecretKey')
			.mockResolvedValue();
	});

	test('Should render Recovery screen correctly', async () => {
		const { findByTestId } = render(<RecoverAccountScreen />, { wrapper });

		const recoveryTitle = await findByTestId('recoverAccountScreenTitle');
		const recoverAccountIndications = await findByTestId(
			'recoverAccountIndications',
		);
		const planetPayRecoveryCodeInput = await findByTestId(
			'planetPayRecoveryCodeInput',
		);
		const biggerRecoveryCodeInput = await findByTestId(
			'biggerRecoveryCodeInput',
		);
		const recoverAccountButton = await findByTestId(
			'recoverAccountSubmitButton',
		);

		expect(recoveryTitle).toBeTruthy();
		expect(recoverAccountIndications).toBeTruthy();
		expect(planetPayRecoveryCodeInput).toBeTruthy();
		expect(biggerRecoveryCodeInput).toBeTruthy();
		expect(recoverAccountButton).toBeTruthy();
	});

	test('Should display validation errors if no recovery code is provided', async () => {
		const { findByTestId } = render(<RecoverAccountScreen />, { wrapper });

		const recoverAccountButton = await findByTestId(
			'recoverAccountSubmitButton',
		);

		await act(async () => {
			fireEvent.press(recoverAccountButton);
		});

		const planetPayRecoveryCodeInputError = await findByTestId(
			'planetPayRecoveryCodeInputError',
		);
		const biggerRecoveryCodeInputError = await findByTestId(
			'biggerRecoveryCodeInputError',
		);

		expect(planetPayRecoveryCodeInputError).toBeTruthy();
		expect(biggerRecoveryCodeInputError).toBeTruthy();
	});

	test('Should redirect to home screen after a successful recovery', async () => {
		const { findByTestId } = render(<RecoverAccountScreen />, { wrapper });

		const planetPayRecoveryCodeInput = await findByTestId(
			'planetPayRecoveryCodeInput',
		);
		const biggerRecoveryCodeInput = await findByTestId(
			'biggerRecoveryCodeInput',
		);
		const recoverAccountButton = await findByTestId(
			'recoverAccountSubmitButton',
		);

		await act(async () => {
			fireEvent.changeText(planetPayRecoveryCodeInput, '12345');
			fireEvent.changeText(biggerRecoveryCodeInput, '54321');
			fireEvent.press(recoverAccountButton);
		});

		expect(mockReplace).toHaveBeenCalledWith(NavigationRoutes.HOME);
	});
});
