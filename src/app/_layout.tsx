import { useFonts } from 'expo-font';
import { Stack, useNavigationContainerRef } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '../../global.css';
import { Sentry, navigationIntegration } from '../config/sentry-config';
import { QueryClientProvider } from '../providers/QueryClientProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	const ref = useNavigationContainerRef();

	useEffect(() => {
		if (ref?.current) {
			navigationIntegration.registerNavigationContainer(ref);
		}
	}, [ref]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<QueryClientProvider>
			<SafeAreaProvider>
				<Stack>
					<Stack.Screen name="index" options={{ title: 'HomePage' }} />
				</Stack>
			</SafeAreaProvider>
		</QueryClientProvider>
	);
}

const Layout = Sentry.wrap(RootLayout);
export default Layout;
