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

		await waitFor(element(by.id('profileContainerButton')))
			.toExist()
			.withTimeout(5000);

		await element(by.id('profileContainerButton')).tap();
		await element(by.id('goToForgotPasswordButton')).tap();

		await waitFor(element(by.id('forgotPasswordScreenTitle')))
			.toBeVisible()
			.withTimeout(5000);

		await element(by.id('forgotPasswordUsernameInput')).typeText(
			'user@test.com',
		);
		await element(by.id('forgotPasswordSubmitButton')).tap();

		await waitFor(element(by.text('OK')))
			.toBeVisible()
			.withTimeout(5000);

		await element(by.text('OK')).tap();

		await waitFor(element(by.id('confirmPasswordScreenTitle')))
			.toBeVisible()
			.withTimeout(5000);
	});

	describe('UI Elements', () => {
		it('Should render all password reset form elements', async () => {
			await expect(element(by.id('confirmPasswordScreenTitle'))).toBeVisible();
			await expect(element(by.id('confirmPasswordCodeInput'))).toBeVisible();
			await expect(
				element(by.id('confirmPasswordNewPasswordInput')),
			).toBeVisible();
			await expect(element(by.id('confirmPasswordSubmitButton'))).toBeVisible();
		});
	});

	describe('Form Validation', () => {
		it('Should show validation errors for empty fields', async () => {
			await element(by.id('confirmPasswordSubmitButton')).tap();
			await expect(
				element(by.id('confirmPasswordCodeInputError')),
			).toBeVisible();
			await expect(
				element(by.id('confirmPasswordNewPasswordInputError')),
			).toBeVisible();
		});

		it('Should show error for invalid confirmation code format', async () => {
			await element(by.id('confirmPasswordCodeInput')).typeText('123');
			await element(by.id('confirmPasswordSubmitButton')).tap();
			await expect(
				element(by.id('confirmPasswordCodeInputError')),
			).toBeVisible();
		});
	});

	describe('Password Reset Flow', () => {
		it('Should successfully reset password with valid information', async () => {
			await element(by.id('confirmPasswordNewPasswordInput')).typeText(
				'Qwer@123',
			);
			await element(by.id('confirmPasswordCodeInput')).typeText('615278');
			await element(by.id('confirmPasswordSubmitButton')).tap();

			await waitFor(element(by.text('OK')))
				.toBeVisible()
				.withTimeout(3000);

			await element(by.text('OK')).tap();

			await waitFor(element(by.id('loginScreenTitle')))
				.toBeVisible()
				.withTimeout(3000);
		});
	});

	describe('Navigation', () => {
		it('Should show back button and navigate back to forgot password screen', async () => {
			await expect(element(by.id('goBackButton'))).toBeVisible();
			await element(by.id('goBackButton')).tap();
			await expect(element(by.id('forgotPasswordScreenTitle'))).toBeVisible();
		});
	});
});
