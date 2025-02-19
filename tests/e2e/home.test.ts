import { expect } from 'detox';

describe('Home Screen', () => {
	beforeAll(async () => {
		await device.launchApp();
	});

	beforeEach(async () => {
		await device.reloadReactNative();
	});

	it('Should render home view', async () => {
		await expect(element(by.id('welcome-view'))).toBeVisible();
	});

	it('Should have welcome text', async () => {
		await expect(element(by.text('Welcome!'))).toHaveText('Welcome!');
	});
});
