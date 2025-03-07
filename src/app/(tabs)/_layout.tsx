import { Href, Tabs, useRouter } from 'expo-router';
import { useContext } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { BackButton } from '@/components/BackButton/BackButton';
import { DiscoverIcon } from '@/components/assets/icons/DiscoverIcon';
import { ForumIcon } from '@/components/assets/icons/ForumIcon';
import { GalleryIcon } from '@/components/assets/icons/GalleryIcon';
import { MenuIcon } from '@/components/assets/icons/MenuIcon';
import { ProfileIcon } from '@/components/assets/icons/ProfileIcon';
import { WalletIcon } from '@/components/assets/icons/WalletIcon';
import { NavigationRoutes } from '@/constants/navigation.routes.enum';
import { AuthContext } from '@/context/auth.context';

export default function TabLayout() {
	const TabsColors = {
		profile: '#38A8AB',
		wallet: '#4D7D3B',
		discover: '#1A3F6C',
		gallery: '#1A3F6C',
		forum: '#4D91A7',
		tabBarBackground: '#F7F4F3',
	};
	const router = useRouter();
	const { isAuthenticated } = useContext(AuthContext);

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
					router.canGoBack() && (
						<BackButton className="pl-2" returnType={'dismiss'} />
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
					<TouchableOpacity className="px-4">
						<MenuIcon testID="MenuIcon" />
					</TouchableOpacity>
				),
			}}
		>
			<Tabs.Screen
				name="forum"
				options={{
					title: 'Forum',
					tabBarIcon: () => (
						<ForumIcon width={19} height={19} testID="ForumTabBarIcon" />
					),
					tabBarActiveTintColor: TabsColors.forum,
				}}
			/>

			<Tabs.Screen
				name="discover"
				options={{
					title: 'Discover',
					tabBarIcon: () => (
						<DiscoverIcon width={19} height={19} testID="DiscoverTabBarIcon" />
					),
					tabBarActiveTintColor: TabsColors.discover,
				}}
			/>

			<Tabs.Screen
				name="gallery"
				options={{
					title: 'Gallery',
					tabBarIcon: () => (
						<GalleryIcon width={19} height={19} testID="GalleryTabBarIcon" />
					),
					tabBarActiveTintColor: TabsColors.gallery,
				}}
				listeners={{
					tabPress: (e) => {
						if (!isAuthenticated) {
							e.preventDefault();
							router.push(NavigationRoutes.LOGIN as Href);
						}
					},
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarIcon: () => (
						<ProfileIcon width={18} height={18} testID="ProfileTabBarIcon" />
					),
					tabBarActiveTintColor: TabsColors.profile,
				}}
				listeners={{
					tabPress: (e) => {
						if (!isAuthenticated) {
							e.preventDefault();
							router.push(NavigationRoutes.LOGIN as Href);
						}
					},
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
				listeners={{
					tabPress: (e) => {
						if (!isAuthenticated) {
							e.preventDefault();
							router.push(NavigationRoutes.LOGIN as Href);
						}
					},
				}}
			/>
		</Tabs>
	);
}
