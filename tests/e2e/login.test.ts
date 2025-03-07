import { expect } from 'detox';
import { WireMock } from 'wiremock-captain';

describe('Login Screen', () => {
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

		await waitFor(element(by.id('LoginScreenTitle')))
			.toBeVisible()
			.withTimeout(5000);
	});

	describe('UI Elements', () => {
		it('Should render all login form elements', async () => {
			await expect(element(by.id('LoginScreenTitle'))).toBeVisible();
			await expect(element(by.id('LoginUsernameInput'))).toBeVisible();
			await expect(element(by.id('LoginPasswordInput'))).toBeVisible();
			await expect(element(by.id('LoginSubmitButton'))).toBeVisible();
			await expect(element(by.id('GoToForgotPasswordButton'))).toBeVisible();
			await expect(element(by.id('GoToRegisterButton'))).toBeVisible();
		});
	});

	describe('Form Validation', () => {
		it('Should show validation errors for empty fields', async () => {
			await element(by.id('LoginSubmitButton')).tap();
			await expect(element(by.id('LoginUsernameInputError'))).toBeVisible();
			await expect(element(by.id('LoginPasswordInputError'))).toBeVisible();
		});

		it('Should show error for invalid email format', async () => {
			await element(by.id('LoginUsernameInput')).typeText('invalidemail');
			await element(by.id('LoginSubmitButton')).tap();
			await expect(element(by.id('LoginUsernameInputError'))).toBeVisible();
		});
	});

	describe('Login Flow', () => {
		it('Should successfully login with valid credentials', async () => {
			await element(by.id('LoginUsernameInput')).typeText('user@test.com');
			await element(by.id('LoginPasswordInput')).typeText('Qwer@123');
			await element(by.id('LoginSubmitButton')).tap();

			await waitFor(element(by.label('My Pocket Gallery')))
				.toBeVisible()
				.withTimeout(5000);
		});

		it('Should show error message for invalid credentials', async () => {
			await element(by.id('LoginUsernameInput')).typeText('wrong@example.com');
			await element(by.id('LoginPasswordInput')).typeText('WrongPassword123!');
			await element(by.id('LoginSubmitButton')).tap();

			await waitFor(element(by.text('OK')))
				.toBeVisible()
				.withTimeout(3000);

			await element(by.text('OK')).tap();
		});
	});

	describe('Navigation', () => {
		it('Should navigate to forgot password screen', async () => {
			await expect(element(by.id('GoToForgotPasswordButton'))).toBeVisible();
			await element(by.id('GoToForgotPasswordButton')).tap();
			await expect(element(by.id('ForgotPasswordScreenTitle'))).toBeVisible();
		});

		it('Should navigate to register screen', async () => {
			await expect(element(by.id('GoToRegisterButton'))).toBeVisible();
			await element(by.id('GoToRegisterButton')).tap();
			await expect(element(by.id('RegisterScreenTitle'))).toBeVisible();
		});

		it('Should show back button and navigate back', async () => {
			await expect(element(by.id('GoBackButton'))).toBeVisible();
			await element(by.id('GoBackButton')).tap();
			await expect(element(by.label('My Pocket Gallery'))).toBeVisible();
		});
	});
});
