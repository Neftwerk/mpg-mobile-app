import { render } from '@testing-library/react-native';

import DiscoverScreen from '@/app/(tabs)/discover';

describe('DiscoverScreen', () => {
	test('Should render discover screen correctly', async () => {
		const { findByTestId } = render(<DiscoverScreen />);

		const screen = await findByTestId('DiscoverScreen');
		const text = await findByTestId('DiscoverScreenText');

		expect(screen).toBeTruthy();
		expect(text).toBeTruthy();
		expect(text.props.children).toBe('Discover');
	});
});
