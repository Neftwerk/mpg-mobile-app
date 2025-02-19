import { render, waitFor } from '@testing-library/react-native';
import React from 'react';

import { HomeComponent } from '@/components/home/HomeComponent';

describe('HomeScreen', () => {
	test('Should home screen match snapshot', async () => {
		const tree = render(<HomeComponent />).toJSON();
		await waitFor(() => expect(tree).toMatchSnapshot());
	});

	test('Text renders correctly on HomeScreen', async () => {
		const { findByText } = render(<HomeComponent />);

		const greetingText = await findByText('Welcome!');

		expect(greetingText).toBeTruthy();
	});
});
