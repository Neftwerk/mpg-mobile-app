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

		await waitFor(element(by.id('ProfileContainerButton')))
			.toExist()
			.withTimeout(5000);

		await element(by.id('ProfileContainerButton')).tap();
		await element(by.id('GoToRegisterButton')).tap();

		await waitFor(element(by.id('RegisterScreenTitle')))
			.toBeVisible()
			.withTimeout(5000);
	});

	describe('UI Elements', () => {
		it('Should render all registration form elements', async () => {
			await expect(element(by.id('RegisterScreenTitle'))).toBeVisible();

			await expect(element(by.id('RegisterUsernameInput'))).toBeVisible();
			await expect(element(by.id('RegisterPasswordInput'))).toBeVisible();
			await expect(element(by.id('RegisterNameInput'))).toBeVisible();
			await expect(element(by.id('RegisterSurnameInput'))).toBeVisible();
			await expect(element(by.id('RegisterBiographyInput'))).toBeVisible();

			await expect(element(by.id('RegisterSubmitButton'))).toBeVisible();
		});
	});

	describe('Form Validation', () => {
		it('Should show validation errors for empty fields', async () => {
			await element(by.id('RegisterSubmitButton')).tap();
			await expect(element(by.id('RegisterUsernameInputError'))).toBeVisible();
			await expect(element(by.id('RegisterPasswordInputError'))).toBeVisible();
			await expect(element(by.id('RegisterNameInputError'))).toBeVisible();
			await expect(element(by.id('RegisterSurnameInputError'))).toBeVisible();
		});

		it('Should show error for invalid email format', async () => {
			await element(by.id('RegisterUsernameInput')).typeText('invalidemail');
			await element(by.id('RegisterSubmitButton')).tap();
			await expect(element(by.id('RegisterUsernameInputError'))).toBeVisible();
		});
	});

	describe('Registration Flow', () => {
		it('Should successfully register with valid information', async () => {
			await element(by.id('RegisterUsernameInput')).typeText('user@test.com');
			await element(by.id('RegisterPasswordInput')).typeText('Qwer@123');
			await element(by.id('RegisterNameInput')).typeText('John2');
			await element(by.id('RegisterSurnameInput')).typeText('Doe2');
			await element(by.id('RegisterBiographyInput')).typeText(
				'I am a test user',
			);
			await element(by.id('RegisterSubmitButton')).tap();

			await waitFor(element(by.id('ConfirmUserScreenTitle')))
				.toBeVisible()
				.withTimeout(5000);
		});

		it('Should stay in the register page if there is an error creating a user', async () => {
			await element(by.id('RegisterNameInput')).typeText('Test User');
			await element(by.id('RegisterUsernameInput')).typeText(
				'existing@test.com',
			);
			await element(by.id('RegisterPasswordInput')).typeText('pwer123');
			await element(by.id('RegisterSurnameInput')).typeText('Doe2');
			await element(by.id('RegisterSubmitButton')).tap();

			await expect(element(by.id('RegisterScreenTitle'))).toBeVisible();
		});
	});

	describe('Navigation', () => {
		it('Should navigate to login screen', async () => {
			await expect(element(by.id('GoBackButton'))).toBeVisible();
			await element(by.id('GoBackButton')).tap();
			await expect(element(by.id('LoginScreenTitle'))).toBeVisible();
		});
	});
});
