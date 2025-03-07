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

		it('Should navigate to Profile when Profile button is pressed', async () => {
			await waitFor(element(by.id('ProfileContainerButton')))
				.toExist()
				.withTimeout(5000);

			await element(by.id('ProfileContainerButton')).tap();
			await waitFor(element(by.id('ProfileScreenText')))
				.toBeVisible()
				.withTimeout(4000);
		});

		it('Should navigate to Wallet when Wallet button is pressed', async () => {
			await waitFor(element(by.id('WalletContainerButton')))
				.toExist()
				.withTimeout(5000);
			await element(by.id('WalletContainerButton')).tap();
			await expect(element(by.id('WalletScreenText'))).toBeVisible();
		});
	});

	describe('Navigation', () => {
		beforeEach(async () => {
			await waitFor(element(by.id('WalletContainerButton')))
				.toExist()
				.withTimeout(5000);
			await element(by.id('WalletContainerButton')).tap();
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
