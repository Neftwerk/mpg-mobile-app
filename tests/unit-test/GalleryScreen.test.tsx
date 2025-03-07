import { render } from '@testing-library/react-native';
import { Redirect } from 'expo-router';

import GalleryScreen from '@/app/(tabs)/gallery';
import { NavigationRoutes } from '@/constants/navigation.routes.enum';
import { AuthContext } from '@/context/auth.context';

jest.mock('expo-router');

describe('GalleryScreen', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('Should redirect to login when not authenticated', () => {
		const mockRedirect = jest.mocked(Redirect);

		render(
			<AuthContext.Provider
				value={{
					isAuthenticated: false,
					isLoading: false,
					user: null,
					setUser: jest.fn(),
					setIsAuthenticated: jest.fn(),
					setIsLoading: jest.fn(),
					logout: jest.fn(),
					checkAuth: jest.fn(),
				}}
			>
				<GalleryScreen />
			</AuthContext.Provider>,
		);

		expect(mockRedirect).toHaveBeenCalledWith(
			expect.objectContaining({ href: NavigationRoutes.LOGIN }),
			{},
		);
	});

	test('Should render gallery screen when authenticated', async () => {
		const { findByTestId } = render(
			<AuthContext.Provider
				value={{
					isAuthenticated: true,
					isLoading: false,
					user: null,
					setUser: jest.fn(),
					setIsAuthenticated: jest.fn(),
					setIsLoading: jest.fn(),
					logout: jest.fn(),
					checkAuth: jest.fn(),
				}}
			>
				<GalleryScreen />
			</AuthContext.Provider>,
		);

		const screen = await findByTestId('GalleryScreen');
		const text = await findByTestId('GalleryScreenText');

		expect(screen).toBeTruthy();
		expect(text).toBeTruthy();
		expect(text.props.children).toBe('Gallery');
	});
});
