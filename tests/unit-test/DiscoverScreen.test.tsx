import { render } from '@testing-library/react-native';

import DiscoverScreen from '@/app/(tabs)/discover';

describe('DiscoverScreen', () => {
	test('Should render discover screen correctly', async () => {
		const { findByTestId } = render(<DiscoverScreen />);

		const screen = await findByTestId('discoverScreen');
		const text = await findByTestId('discoverScreenText');

		expect(screen).toBeTruthy();
		expect(text).toBeTruthy();
		expect(text.props.children).toBe('Discover');
	});
});
