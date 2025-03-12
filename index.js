import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import 'react-native-get-random-values';

// Must be exported or Fast Refresh won't update the context
export function App() {
	const ctx = require.context('./src/app');
	return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
