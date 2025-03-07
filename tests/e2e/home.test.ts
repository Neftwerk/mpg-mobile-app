import { expect } from 'detox';

const hexagonButtonIds = [
	'ForumContainerButton',
	'GalleryContainerButton',
	'DiscoverContainerButton',
	'WalletContainerButton',
	'ProfileContainerButton',
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
			await waitFor(element(by.id('ProfileContainerButton')))
				.toExist()
				.withTimeout(5000);

			await element(by.id('ProfileContainerButton')).tap();
			await waitFor(element(by.id('LoginScreenTitle')))
				.toBeVisible()
				.withTimeout(4000);
		});

		it('Should navigate to Login Page if the Wallet button is pressed without being logged in', async () => {
			await waitFor(element(by.id('WalletContainerButton')))
				.toExist()
				.withTimeout(5000);
			await element(by.id('WalletContainerButton')).tap();
			await waitFor(element(by.id('LoginScreenTitle')))
				.toBeVisible()
				.withTimeout(4000);
		});

		it('Should navigate to Login Page if the Gallery button is pressed without being logged in', async () => {
			await waitFor(element(by.id('GalleryContainerButton')))
				.toExist()
				.withTimeout(5000);
			await element(by.id('GalleryContainerButton')).tap();
			await waitFor(element(by.id('LoginScreenTitle')))
				.toBeVisible()
				.withTimeout(4000);
		});

		it('Should navigate to Forum Page if the Forum button is pressed', async () => {
			await waitFor(element(by.id('ForumContainerButton')))
				.toExist()
				.withTimeout(5000);
			await element(by.id('ForumContainerButton')).tap();
			await waitFor(element(by.id('ForumScreenText')))
				.toBeVisible()
				.withTimeout(3000);
		});

		it('Should navigate to Discover Page if the Discover button is pressed', async () => {
			await waitFor(element(by.id('DiscoverContainerButton')))
				.toExist()
				.withTimeout(5000);
			await element(by.id('DiscoverContainerButton')).tap();
			await waitFor(element(by.id('DiscoverScreenText')))
				.toBeVisible()
				.withTimeout(3000);
		});
	});

	describe('Navigation', () => {
		beforeEach(async () => {
			await waitFor(element(by.id('ForumContainerButton')))
				.toExist()
				.withTimeout(5000);
			await element(by.id('ForumContainerButton')).tap();
		});

		it('Should show back button when navigating to a new screen', async () => {
			await expect(element(by.id('GoBackButton'))).toBeVisible();
		});

		it('Should navigate back to home screen when back button is pressed', async () => {
			await element(by.id('GoBackButton')).tap();
			await expect(element(by.label('My Pocket Gallery'))).toBeVisible();
		});

		it('Should show menu icon in header', async () => {
			await expect(element(by.id('MenuIcon'))).toBeVisible();
		});
	});
});
