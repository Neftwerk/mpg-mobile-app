import { expect } from 'detox';

const hexagonButtonIds = [
	'forumContainerButton',
	'galleryContainerButton',
	'discoverContainerButton',
	'walletContainerButton',
	'profileContainerButton',
];

describe('Home Screen', () => {
	beforeAll(async () => {
		await device.launchApp();
	});

	beforeEach(async () => {
		await device.reloadReactNative();
	});

	describe('Header', () => {
		it('Should render header with correct title', async () => {
			await waitFor(element(by.label('My Pocket Gallery')))
				.toBeVisible()
				.withTimeout(3000);
		});
	});

	describe('Home Page Buttons', () => {
		it('Should render all hexagon buttons with correct labels', async () => {
			for (const hexagon of hexagonButtonIds) {
				await waitFor(element(by.id(hexagon)))
					.toExist()
					.withTimeout(5000);
			}
		});

		it('Should navigate to Login Page if the Profile is pressed without being logged in', async () => {
			await waitFor(element(by.id('profileContainerButton')))
				.toExist()
				.withTimeout(5000);

			await element(by.id('profileContainerButton')).tap();
			await waitFor(element(by.id('loginScreenTitle')))
				.toBeVisible()
				.withTimeout(4000);
		});

		it('Should navigate to Login Page if the Wallet button is pressed without being logged in', async () => {
			await waitFor(element(by.id('walletContainerButton')))
				.toExist()
				.withTimeout(5000);
			await element(by.id('walletContainerButton')).tap();
			await waitFor(element(by.id('loginScreenTitle')))
				.toBeVisible()
				.withTimeout(4000);
		});

		it('Should navigate to Login Page if the Gallery button is pressed without being logged in', async () => {
			await waitFor(element(by.id('galleryContainerButton')))
				.toExist()
				.withTimeout(5000);
			await element(by.id('galleryContainerButton')).tap();
			await waitFor(element(by.id('loginScreenTitle')))
				.toBeVisible()
				.withTimeout(4000);
		});

		it('Should navigate to Forum Page if the Forum button is pressed', async () => {
			await waitFor(element(by.id('forumContainerButton')))
				.toExist()
				.withTimeout(5000);
			await element(by.id('forumContainerButton')).tap();
			await waitFor(element(by.id('forumScreenText')))
				.toBeVisible()
				.withTimeout(3000);
		});

		it('Should navigate to Discover Page if the Discover button is pressed', async () => {
			await waitFor(element(by.id('discoverContainerButton')))
				.toExist()
				.withTimeout(5000);
			await element(by.id('discoverContainerButton')).tap();
			await waitFor(element(by.id('discoverScreenText')))
				.toBeVisible()
				.withTimeout(3000);
		});
	});

	describe('Navigation', () => {
		beforeEach(async () => {
			await waitFor(element(by.id('forumContainerButton')))
				.toExist()
				.withTimeout(5000);
			await element(by.id('forumContainerButton')).tap();
		});

		it('Should show back button when navigating to a new screen', async () => {
			await expect(element(by.id('goBackButton'))).toBeVisible();
		});

		it('Should navigate back to home screen when back button is pressed', async () => {
			await element(by.id('goBackButton')).tap();
			await expect(element(by.label('My Pocket Gallery'))).toBeVisible();
		});

		it('Should show menu icon in header', async () => {
			await expect(element(by.id('menuIcon'))).toBeVisible();
		});
	});
});
