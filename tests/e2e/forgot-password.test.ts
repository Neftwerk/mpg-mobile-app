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

		await waitFor(element(by.id('profileContainerButton')))
			.toExist()
			.withTimeout(5000);

		await element(by.id('profileContainerButton')).tap();
		await element(by.id('goToForgotPasswordButton')).tap();

		await waitFor(element(by.id('forgotPasswordScreenTitle')))
			.toBeVisible()
			.withTimeout(5000);
	});

	describe('UI Elements', () => {
		it('Should render all forgot password form elements', async () => {
			await expect(element(by.id('forgotPasswordScreenTitle'))).toBeVisible();
			await expect(element(by.id('forgotPasswordUsernameInput'))).toBeVisible();
			await expect(element(by.id('forgotPasswordSubmitButton'))).toBeVisible();
			await expect(element(by.id('goBackButton'))).toBeVisible();
		});
	});

	describe('Form Validation', () => {
		it('Should show validation error for empty email', async () => {
			await element(by.id('forgotPasswordSubmitButton')).tap();
			await expect(
				element(by.id('forgotPasswordUsernameInputError')),
			).toBeVisible();
		});

		it('Should show error for invalid email format', async () => {
			await element(by.id('forgotPasswordUsernameInput')).typeText(
				'invalidemail',
			);
			await element(by.id('forgotPasswordSubmitButton')).tap();
			await expect(
				element(by.id('forgotPasswordUsernameInputError')),
			).toBeVisible();
		});
	});

	describe('Reset Password Flow', () => {
		it('Should successfully send reset link for valid email', async () => {
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

		it('Should stay in the forgot password page if there is an error sending the code', async () => {
			await element(by.id('forgotPasswordUsernameInput')).typeText(
				'nonexistent@test.com',
			);
			await element(by.id('forgotPasswordSubmitButton')).tap();
			await expect(element(by.id('forgotPasswordScreenTitle'))).toBeVisible();
		});
	});

	describe('Navigation', () => {
		it('Should show back button and navigate back to login screen', async () => {
			await expect(element(by.id('goBackButton'))).toBeVisible();
			await element(by.id('goBackButton')).tap();
			await expect(element(by.id('loginScreenTitle'))).toBeVisible();
		});
	});
});
