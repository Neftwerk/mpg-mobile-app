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

		await waitFor(element(by.id('ProfileContainerButton')))
			.toExist()
			.withTimeout(5000);

		await element(by.id('ProfileContainerButton')).tap();
		await element(by.id('GoToRegisterButton')).tap();

		await waitFor(element(by.id('RegisterScreenTitle')))
			.toBeVisible()
			.withTimeout(5000);

		await element(by.id('RegisterUsernameInput')).typeText('user@test.com');
		await element(by.id('RegisterPasswordInput')).typeText('Qwer@123');
		await element(by.id('RegisterNameInput')).typeText('John2');
		await element(by.id('RegisterSurnameInput')).typeText('Doe2');
		await element(by.id('RegisterBiographyInput')).typeText('I am a test user');
		await element(by.id('RegisterSubmitButton')).tap();

		await waitFor(element(by.id('ConfirmUserScreenTitle')))
			.toBeVisible()
			.withTimeout(5000);
	});

	describe('UI Elements', () => {
		it('Should render all confirmation form elements', async () => {
			await expect(element(by.id('ConfirmUserScreenTitle'))).toBeVisible();
			await expect(element(by.id('ConfirmUserCodeInput'))).toBeVisible();
			await expect(element(by.id('ConfirmUserSubmitButton'))).toBeVisible();
		});
	});

	describe('Form Validation', () => {
		it('Should show validation error for empty confirmation code', async () => {
			await element(by.id('ConfirmUserSubmitButton')).tap();
			await expect(element(by.id('ConfirmUserCodeInputError'))).toBeVisible();
		});

		it('Should show error for invalid code format', async () => {
			await element(by.id('ConfirmUserCodeInput')).typeText('123');
			await element(by.id('ConfirmUserSubmitButton')).tap();
			await expect(element(by.id('ConfirmUserCodeInputError'))).toBeVisible();
		});
	});

	describe('Confirmation Flow', () => {
		it('Should successfully confirm user with valid code', async () => {
			await element(by.id('ConfirmUserCodeInput')).typeText('615278');
			await element(by.id('ConfirmUserSubmitButton')).tap();

			await waitFor(element(by.text('OK')))
				.toBeVisible()
				.withTimeout(5000);

			await element(by.text('OK')).tap();

			await waitFor(element(by.id('LoginScreenTitle')))
				.toBeVisible()
				.withTimeout(5000);
		});

		it('Should stay in the confirm user page if there is an error confirming the code', async () => {
			await element(by.id('ConfirmUserCodeInput')).typeText('999999');
			await element(by.id('ConfirmUserSubmitButton')).tap();
			await expect(element(by.id('ConfirmUserScreenTitle'))).toBeVisible();
		});
	});

	describe('Navigation', () => {
		it('Should show back button and navigate back to register screen', async () => {
			await expect(element(by.id('GoBackButton'))).toBeVisible();
			await element(by.id('GoBackButton')).tap();
			await expect(element(by.id('RegisterScreenTitle'))).toBeVisible();
		});
	});
});
