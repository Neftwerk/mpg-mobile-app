import { ImageBackground } from 'react-native';

import { walletIcon } from '../index';

interface IWalletIconProps {
	width?: number;
	height?: number;
	testID?: string;
}

export const WalletIcon = ({
	width = 31,
	height = 30,
	testID,
}: IWalletIconProps) => {
	return (
		<ImageBackground
			source={walletIcon}
			style={{ width: width, height: height }}
			resizeMode="contain"
			testID={testID}
		/>
	);
};
