import * as Sentry from '@sentry/react-native';
import { isRunningInExpoGo } from 'expo';

export const navigationIntegration = Sentry.reactNavigationIntegration({
	enableTimeToInitialDisplay: !isRunningInExpoGo(),
});

Sentry.init({
	dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
	tracesSampleRate: 1.0,
	integrations: [navigationIntegration],
	enableNativeFramesTracking: !isRunningInExpoGo(),
});

export { Sentry };
