import { render } from '@testing-library/react-native';
import React from 'react';

import { HomeComponent } from '@/components/home/HomeComponent';

describe('HomeScreen', () => {
	test('Should render home page buttons', async () => {
		const { findByText } = render(<HomeComponent />);

		const forumButton = await findByText('Forum');
		const galleryButton = await findByText('Gallery');
		const discoverButton = await findByText('Discover');
		const walletButton = await findByText('Wallet');
		const profileButton = await findByText('Profile');

		expect(forumButton).toBeTruthy();
		expect(galleryButton).toBeTruthy();
		expect(discoverButton).toBeTruthy();
		expect(walletButton).toBeTruthy();
		expect(profileButton).toBeTruthy();
	});
});
