import { Tabs, useNavigation } from 'expo-router';
import {
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

import { MenuIcon } from '@/components/assets/icons/MenuIcon';
import { ProfileIcon } from '@/components/assets/icons/ProfileIcon';
import { WalletIcon } from '@/components/assets/icons/WalletIcon';

export default function TabLayout() {
	const navigation = useNavigation();

	const TabsColors = {
		profile: '#38A8AB',
		wallet: '#4D7D3B',
		tabBarBackground: '#F7F4F3',
	};

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: 'blue',
				tabBarButton: (props) => (
					<TouchableWithoutFeedback onPress={props.onPress}>
						<View
							className="flex-1 flex-col items-center justify-center"
							{...props}
						></View>
					</TouchableWithoutFeedback>
				),
				headerShown: true,
				headerLeft: () =>
					navigation.canGoBack() && (
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							testID="GoBackButton"
						>
							<Text className="text-4xl pl-4 pr-2 items-center">←</Text>
						</TouchableOpacity>
					),
				tabBarStyle: {
					backgroundColor: TabsColors.tabBarBackground,
					position: 'absolute',
					height: 70,
					elevation: 0,
					borderTopWidth: 0,
					justifyContent: 'center',
					alignItems: 'center',
				},
				headerStyle: {
					height: 55,
				},
				tabBarIconStyle: {
					backgroundColor: 'white',
					borderRadius: 10,
					width: 36,
					height: 36,
					justifyContent: 'center',
					alignItems: 'center',
					padding: 2,
					shadowColor: 'black',
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.1,
					shadowRadius: 3.84,
					elevation: 5,
					marginBottom: 8,
				},
				tabBarItemStyle: {
					paddingTop: 4,
				},
				headerPressOpacity: 1,
				headerRight: () => (
					<TouchableOpacity
						className="px-4"
						onPress={() => navigation.goBack()}
					>
						<MenuIcon testID="MenuIcon" />
					</TouchableOpacity>
				),
			}}
		>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarIcon: () => (
						<ProfileIcon width={18} height={18} testID="ProfileTabBarIcon" />
					),
					tabBarActiveTintColor: TabsColors.profile,
				}}
			/>
			<Tabs.Screen
				name="wallet"
				options={{
					title: 'Wallet',
					tabBarIcon: () => (
						<WalletIcon width={19} height={19} testID="WalletTabBarIcon" />
					),
					tabBarActiveTintColor: TabsColors.wallet,
				}}
			/>
		</Tabs>
	);
}
