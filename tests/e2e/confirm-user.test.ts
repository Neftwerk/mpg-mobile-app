import { expect } from 'detox';
import { WireMock } from 'wiremock-captain';

describe('Confirm User Screen', () => {
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

		await element(by.id('registerUsernameInput')).typeText('user@test.com');
		await element(by.id('registerPasswordInput')).typeText('Qwer@123');
		await element(by.id('registerNameInput')).typeText('John2');
		await element(by.id('registerSurnameInput')).typeText('Doe2');
		await element(by.id('registerBiographyInput')).typeText('I am a test user');
		await element(by.id('registerSubmitButton')).tap();

		await waitFor(element(by.id('confirmUserScreenTitle')))
			.toBeVisible()
			.withTimeout(5000);
	});

	describe('UI Elements', () => {
		it('Should render all confirmation form elements', async () => {
			await expect(element(by.id('confirmUserScreenTitle'))).toBeVisible();
			await expect(element(by.id('confirmUserCodeInput'))).toBeVisible();
			await expect(element(by.id('confirmUserSubmitButton'))).toBeVisible();
		});
	});

	describe('Form Validation', () => {
		it('Should show validation error for empty confirmation code', async () => {
			await element(by.id('confirmUserSubmitButton')).tap();
			await expect(element(by.id('confirmUserCodeInputError'))).toBeVisible();
		});

		it('Should show error for invalid code format', async () => {
			await element(by.id('confirmUserCodeInput')).typeText('123');
			await element(by.id('confirmUserSubmitButton')).tap();
			await expect(element(by.id('confirmUserCodeInputError'))).toBeVisible();
		});
	});

	describe('Confirmation Flow', () => {
		it('Should successfully confirm user with valid code', async () => {
			await element(by.id('confirmUserCodeInput')).typeText('615278');
			await element(by.id('confirmUserSubmitButton')).tap();

			await waitFor(element(by.text('OK')))
				.toBeVisible()
				.withTimeout(5000);

			await element(by.text('OK')).tap();

			await waitFor(element(by.id('loginScreenTitle')))
				.toBeVisible()
				.withTimeout(5000);
		});

		it('Should stay in the confirm user page if there is an error confirming the code', async () => {
			await element(by.id('confirmUserCodeInput')).typeText('999999');
			await element(by.id('confirmUserSubmitButton')).tap();
			await expect(element(by.id('confirmUserScreenTitle'))).toBeVisible();
		});
	});

	describe('Navigation', () => {
		it('Should show back button and navigate back to register screen', async () => {
			await expect(element(by.id('goBackButton'))).toBeVisible();
			await element(by.id('goBackButton')).tap();
			await expect(element(by.id('registerScreenTitle'))).toBeVisible();
		});
	});
});
