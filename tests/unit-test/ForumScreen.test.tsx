import { render } from '@testing-library/react-native';

import ForumScreen from '@/app/(tabs)/forum';

describe('ForumScreen', () => {
	test('Should render forum screen correctly', async () => {
		const { findByTestId } = render(<ForumScreen />);

		const screen = await findByTestId('forumScreen');
		const text = await findByTestId('forumScreenText');

		expect(screen).toBeTruthy();
		expect(text).toBeTruthy();
		expect(text.props.children).toBe('Forum');
	});
});
