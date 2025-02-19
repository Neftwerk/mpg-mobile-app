const { getSentryExpoConfig } = require('@sentry/react-native/metro');
const { withNativeWind } = require('nativewind/metro');

const config = getSentryExpoConfig(__dirname, {
	enableSourceContextInDevelopment: true,
	annotateReactComponents: true,
});

module.exports = withNativeWind(config, { input: './global.css' });
