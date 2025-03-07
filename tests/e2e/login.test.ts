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

		await waitFor(element(by.id('profileContainerButton')))
			.toExist()
			.withTimeout(5000);

		await element(by.id('profileContainerButton')).tap();

		await waitFor(element(by.id('loginScreenTitle')))
			.toBeVisible()
			.withTimeout(5000);
	});

	describe('UI Elements', () => {
		it('Should render all login form elements', async () => {
			await expect(element(by.id('loginScreenTitle'))).toBeVisible();
			await expect(element(by.id('loginUsernameInput'))).toBeVisible();
			await expect(element(by.id('loginPasswordInput'))).toBeVisible();
			await expect(element(by.id('loginSubmitButton'))).toBeVisible();
			await expect(element(by.id('goToForgotPasswordButton'))).toBeVisible();
			await expect(element(by.id('goToRegisterButton'))).toBeVisible();
		});
	});

	describe('Form Validation', () => {
		it('Should show validation errors for empty fields', async () => {
			await element(by.id('loginSubmitButton')).tap();
			await expect(element(by.id('loginUsernameInputError'))).toBeVisible();
			await expect(element(by.id('loginPasswordInputError'))).toBeVisible();
		});

		it('Should show error for invalid email format', async () => {
			await element(by.id('loginUsernameInput')).typeText('invalidemail');
			await element(by.id('loginSubmitButton')).tap();
			await expect(element(by.id('loginUsernameInputError'))).toBeVisible();
		});
	});

	describe('Login Flow', () => {
		it('Should successfully login with valid credentials', async () => {
			await element(by.id('loginUsernameInput')).typeText('user@test.com');
			await element(by.id('loginPasswordInput')).typeText('Qwer@123');
			await element(by.id('loginSubmitButton')).tap();

			await waitFor(element(by.label('My Pocket Gallery')))
				.toBeVisible()
				.withTimeout(5000);
		});

		it('Should show error message for invalid credentials', async () => {
			await element(by.id('loginUsernameInput')).typeText('wrong@example.com');
			await element(by.id('loginPasswordInput')).typeText('WrongPassword123!');
			await element(by.id('loginSubmitButton')).tap();

			await waitFor(element(by.text('OK')))
				.toBeVisible()
				.withTimeout(3000);

			await element(by.text('OK')).tap();
		});
	});

	describe('Navigation', () => {
		it('Should navigate to forgot password screen', async () => {
			await expect(element(by.id('goToForgotPasswordButton'))).toBeVisible();
			await element(by.id('goToForgotPasswordButton')).tap();
			await expect(element(by.id('forgotPasswordScreenTitle'))).toBeVisible();
		});

		it('Should navigate to register screen', async () => {
			await expect(element(by.id('goToRegisterButton'))).toBeVisible();
			await element(by.id('goToRegisterButton')).tap();
			await expect(element(by.id('registerScreenTitle'))).toBeVisible();
		});

		it('Should show back button and navigate back', async () => {
			await expect(element(by.id('goBackButton'))).toBeVisible();
			await element(by.id('goBackButton')).tap();
			await expect(element(by.label('My Pocket Gallery'))).toBeVisible();
		});
	});
});
