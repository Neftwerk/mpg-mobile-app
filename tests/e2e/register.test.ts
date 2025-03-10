import { expect } from 'detox';
import { WireMock } from 'wiremock-captain';

describe('Register Screen', () => {
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
		await element(by.id('goToRegisterButton')).tap();

		await waitFor(element(by.id('registerScreenTitle')))
			.toBeVisible()
			.withTimeout(5000);
	});

	describe('UI Elements', () => {
		it('Should render all registration form elements', async () => {
			await expect(element(by.id('registerScreenTitle'))).toBeVisible();

			await expect(element(by.id('registerUsernameInput'))).toBeVisible();
			await expect(element(by.id('registerPasswordInput'))).toBeVisible();
			await expect(element(by.id('registerNameInput'))).toBeVisible();
			await expect(element(by.id('registerSurnameInput'))).toBeVisible();
			await expect(element(by.id('registerBiographyInput'))).toBeVisible();

			await expect(element(by.id('registerSubmitButton'))).toBeVisible();
		});
	});

	describe('Form Validation', () => {
		it('Should show validation errors for empty fields', async () => {
			await element(by.id('registerSubmitButton')).tap();
			await expect(element(by.id('registerUsernameInputError'))).toBeVisible();
			await expect(element(by.id('registerPasswordInputError'))).toBeVisible();
			await expect(element(by.id('registerNameInputError'))).toBeVisible();
			await expect(element(by.id('registerSurnameInputError'))).toBeVisible();
		});

		it('Should show error for invalid email format', async () => {
			await element(by.id('registerUsernameInput')).typeText('invalidemail');
			await element(by.id('registerSubmitButton')).tap();
			await expect(element(by.id('registerUsernameInputError'))).toBeVisible();
		});
	});

	describe('Registration Flow', () => {
		it('Should successfully register with valid information', async () => {
			await element(by.id('registerUsernameInput')).typeText('user@test.com');
			await element(by.id('registerPasswordInput')).typeText('Qwer@123');
			await element(by.id('registerNameInput')).typeText('John2');
			await element(by.id('registerSurnameInput')).typeText('Doe2');
			await element(by.id('registerBiographyInput')).typeText(
				'I am a test user',
			);
			await element(by.id('registerSubmitButton')).tap();

			await waitFor(element(by.id('confirmUserScreenTitle')))
				.toBeVisible()
				.withTimeout(5000);
		});

		it('Should stay in the register page if there is an error creating a user', async () => {
			await element(by.id('registerNameInput')).typeText('Test User');
			await element(by.id('registerUsernameInput')).typeText(
				'existing@test.com',
			);
			await element(by.id('registerPasswordInput')).typeText('pwer123');
			await element(by.id('registerSurnameInput')).typeText('Doe2');
			await element(by.id('registerSubmitButton')).tap();

			await expect(element(by.id('registerScreenTitle'))).toBeVisible();
		});
	});

	describe('Navigation', () => {
		it('Should navigate to login screen', async () => {
			await expect(element(by.id('goBackButton'))).toBeVisible();
			await element(by.id('goBackButton')).tap();
			await expect(element(by.id('loginScreenTitle'))).toBeVisible();
		});
	});
});
