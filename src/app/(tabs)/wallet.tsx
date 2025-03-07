import { Href, Redirect } from 'expo-router';
import { useContext } from 'react';
import { Text, View } from 'react-native';

import { BackgroundWrapper } from '@/components/BackgroundWrapper/BackgroundWrapper';
import { NavigationRoutes } from '@/constants/navigation.routes.enum';
import { AuthContext } from '@/context/auth.context';

const WalletScreen = () => {
	const { isAuthenticated } = useContext(AuthContext);
	if (!isAuthenticated) {
		return <Redirect href={NavigationRoutes.LOGIN as Href} />;
	}
	return (
		<BackgroundWrapper>
			<View
				testID="walletScreen"
				className="flex-1 justify-center items-center bg-transparent"
			>
				<Text testID="walletScreenText">Wallet</Text>
			</View>
		</BackgroundWrapper>
	);
};

export default WalletScreen;
