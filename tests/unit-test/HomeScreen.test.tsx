import { render } from '@testing-library/react-native';

import { HomeComponent } from '@/components/home/HomeComponent';

describe('HomeScreen', () => {
	const HomePageButtonsText = [
		'Forum',
		'Gallery',
		'Discover',
		'Wallet',
		'Profile',
	];

	test('Should render home page buttons', async () => {
		const { findByText } = render(<HomeComponent />);

		for (const buttonText of HomePageButtonsText) {
			const button = await findByText(buttonText);
			expect(button).toBeTruthy();
		}
	});
});
