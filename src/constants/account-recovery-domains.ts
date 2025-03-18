const TEST_NODE_1 = 'https://local.recovery.io';
const TEST_NODE_2 = 'https://recovery-local.systems';

export const accountRecoveryDomains = {
	PLANET_PAY: new URL(
		process.env.EXPO_PUBLIC_ACCOUNT_RECOVERY_PLANET_PAY_NODE ?? TEST_NODE_1,
	).host,
	BIGGER: new URL(
		process.env.EXPO_PUBLIC_ACCOUNT_RECOVERY_BIGGER_NODE ?? TEST_NODE_2,
	).host,
};
