import { ImageBackground } from 'react-native';

import { walletIcon } from '../index';

export const WalletIcon = ({
	width = 31,
	height = 30,
	testID,
}: {
	width?: number;
	height?: number;
	testID?: string;
}) => {
	return (
		<ImageBackground
			source={walletIcon}
			style={{ width: width, height: height }}
			resizeMode="contain"
			testID={testID}
		/>
	);
};
