import { expect } from 'detox';
import { WireMock } from 'wiremock-captain';

describe('Forgot Password Screen', () => {
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
	});

	describe('UI Elements', () => {
		it('Should render all forgot password form elements', async () => {
			await expect(element(by.id('ForgotPasswordScreenTitle'))).toBeVisible();
			await expect(element(by.id('ForgotPasswordUsernameInput'))).toBeVisible();
			await expect(element(by.id('ForgotPasswordSubmitButton'))).toBeVisible();
			await expect(element(by.id('GoBackButton'))).toBeVisible();
		});
	});

	describe('Form Validation', () => {
		it('Should show validation error for empty email', async () => {
			await element(by.id('ForgotPasswordSubmitButton')).tap();
			await expect(
				element(by.id('ForgotPasswordUsernameInputError')),
			).toBeVisible();
		});

		it('Should show error for invalid email format', async () => {
			await element(by.id('ForgotPasswordUsernameInput')).typeText(
				'invalidemail',
			);
			await element(by.id('ForgotPasswordSubmitButton')).tap();
			await expect(
				element(by.id('ForgotPasswordUsernameInputError')),
			).toBeVisible();
		});
	});

	describe('Reset Password Flow', () => {
		it('Should successfully send reset link for valid email', async () => {
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

		it('Should stay in the forgot password page if there is an error sending the code', async () => {
			await element(by.id('ForgotPasswordUsernameInput')).typeText(
				'nonexistent@test.com',
			);
			await element(by.id('ForgotPasswordSubmitButton')).tap();
			await expect(element(by.id('ForgotPasswordScreenTitle'))).toBeVisible();
		});
	});

	describe('Navigation', () => {
		it('Should show back button and navigate back to login screen', async () => {
			await expect(element(by.id('GoBackButton'))).toBeVisible();
			await element(by.id('GoBackButton')).tap();
			await expect(element(by.id('LoginScreenTitle'))).toBeVisible();
		});
	});
});
