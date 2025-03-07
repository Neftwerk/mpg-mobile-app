import { render } from '@testing-library/react-native';
import { Redirect } from 'expo-router';

import ProfileScreen from '@/app/(tabs)/profile';
import { NavigationRoutes } from '@/constants/navigation.routes.enum';
import { AuthContext } from '@/context/auth.context';

jest.mock('expo-router');
jest.mock('@/services/auth/auth.service', () => ({
	authService: {
		getMe: jest.fn().mockResolvedValue({ id: '1', name: 'Test User' }),
	},
}));

describe('ProfileScreen', () => {
	const mockLogout = jest.fn();

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
				<ProfileScreen />
			</AuthContext.Provider>,
		);

		expect(mockRedirect).toHaveBeenCalledWith(
			expect.objectContaining({ href: NavigationRoutes.LOGIN }),
			{},
		);
	});

	test('Should render profile screen when authenticated', async () => {
		const { findByTestId } = render(
			<AuthContext.Provider
				value={{
					isAuthenticated: true,
					isLoading: false,
					user: null,
					setUser: jest.fn(),
					setIsAuthenticated: jest.fn(),
					setIsLoading: jest.fn(),
					logout: mockLogout,
					checkAuth: jest.fn(),
				}}
			>
				<ProfileScreen />
			</AuthContext.Provider>,
		);

		const screen = await findByTestId('ProfileScreen');
		const text = await findByTestId('ProfileScreenText');

		expect(screen).toBeTruthy();
		expect(text).toBeTruthy();
		expect(text.props.children).toBe('Profile');
	});
});
