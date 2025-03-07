import { expect } from 'detox';
import { WireMock } from 'wiremock-captain';

describe('Confirm Password Screen', () => {
	let wiremock: WireMock;

	beforeAll(async () => {
		await device.launchApp();
		wiremock = new WireMock('http://localhost:8080');
	});

	afterAll(async () => {
		await wiremock.clearAllExceptDefault();
	});

	beforeEach(async () => {
		await device.reloadReactNative();
		await wiremock.clearAllExceptDefault();

		await waitFor(element(by.id('ProfileContainerButton')))
			.toExist()
			.withTimeout(5000);

		await element(by.id('ProfileContainerButton')).tap();
		await element(by.id('GoToForgotPasswordButton')).tap();

		await waitFor(element(by.id('ForgotPasswordScreenTitle')))
			.toBeVisible()
			.withTimeout(5000);

		await element(by.id('ForgotPasswordUsernameInput')).typeText(
			'user@test.com',
		);
		await element(by.id('ForgotPasswordSubmitButton')).tap();

		await waitFor(element(by.text('OK')))
			.toBeVisible()
			.withTimeout(5000);

		await element(by.text('OK')).tap();

		await waitFor(element(by.id('ConfirmPasswordScreenTitle')))
			.toBeVisible()
			.withTimeout(5000);
	});

	describe('UI Elements', () => {
		it('Should render all password reset form elements', async () => {
			await expect(element(by.id('ConfirmPasswordScreenTitle'))).toBeVisible();
			await expect(element(by.id('ConfirmPasswordCodeInput'))).toBeVisible();
			await expect(
				element(by.id('ConfirmPasswordNewPasswordInput')),
			).toBeVisible();
			await expect(element(by.id('ConfirmPasswordSubmitButton'))).toBeVisible();
		});
	});

	describe('Form Validation', () => {
		it('Should show validation errors for empty fields', async () => {
			await element(by.id('ConfirmPasswordSubmitButton')).tap();
			await expect(
				element(by.id('ConfirmPasswordCodeInputError')),
			).toBeVisible();
			await expect(
				element(by.id('ConfirmPasswordNewPasswordInputError')),
			).toBeVisible();
		});

		it('Should show error for invalid confirmation code format', async () => {
			await element(by.id('ConfirmPasswordCodeInput')).typeText('123');
			await element(by.id('ConfirmPasswordSubmitButton')).tap();
			await expect(
				element(by.id('ConfirmPasswordCodeInputError')),
			).toBeVisible();
		});
	});

	describe('Password Reset Flow', () => {
		it('Should successfully reset password with valid information', async () => {
			await element(by.id('ConfirmPasswordNewPasswordInput')).typeText(
				'Qwer@123',
			);
			await element(by.id('ConfirmPasswordCodeInput')).typeText('615278');
			await element(by.id('ConfirmPasswordSubmitButton')).tap();

			await waitFor(element(by.text('OK')))
				.toBeVisible()
				.withTimeout(3000);

			await element(by.text('OK')).tap();

			await waitFor(element(by.id('LoginScreenTitle')))
				.toBeVisible()
				.withTimeout(3000);
		});
	});

	describe('Navigation', () => {
		it('Should show back button and navigate back to forgot password screen', async () => {
			await expect(element(by.id('GoBackButton'))).toBeVisible();
			await element(by.id('GoBackButton')).tap();
			await expect(element(by.id('ForgotPasswordScreenTitle'))).toBeVisible();
		});
	});
});
