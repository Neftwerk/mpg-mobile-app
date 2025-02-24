import { useRouter } from 'expo-router';
import { View } from 'react-native';

import HexagonContainer from './HexagonContainer';

import { DiscoverIcon } from '@/assets/icons/DiscoverIcon';
import { ForumIcon } from '@/assets/icons/ForumIcon';
import { GalleryIcon } from '@/assets/icons/GalleryIcon';
import { ProfileIcon } from '@/assets/icons/ProfileIcon';
import { WalletIcon } from '@/assets/icons/WalletIcon';
import { NavigationRoutes } from '@/constants/navigation.routes.enum';

export const HomePageButtonsComponent = () => {
	const router = useRouter();

	const HexagonContainersData = [
		{
			label: 'Forum',
			icon: ForumIcon,
			className: 'absolute top-[179.28px] left-[98px] h-[128.66px] w-[111px]',
			onPress: () => router.push(NavigationRoutes.PROFILE),
			testId: 'ForumContainer',
		},
		{
			label: 'Gallery',
			icon: GalleryIcon,
			className: 'absolute top-[285px] left-[37.11px] h-[128.66px] w-[111px]',
			onPress: () => router.push(NavigationRoutes.PROFILE),
			testId: 'GalleryContainer',
		},
		{
			label: 'Discover',
			icon: DiscoverIcon,
			className: 'absolute top-[285px] left-[157px] h-[128.66px] w-[111px]',
			onPress: () => router.push(NavigationRoutes.PROFILE),
			testId: 'DiscoverContainer',
		},
		{
			label: 'Wallet',
			icon: WalletIcon,
			className: 'absolute top-[391px] left-[98.11px] h-[128.66px] w-[111px]',
			onPress: () => router.push(NavigationRoutes.PROFILE),
			testId: 'WalletContainer',
		},
		{
			label: 'Profile',
			icon: ProfileIcon,
			className: 'absolute top-[391px] left-[221.11px] h-[128.66px] w-[111px]',
			onPress: () => router.push(NavigationRoutes.PROFILE),
			testId: 'ProfileContainer',
		},
	];

	return (
		<View className="flex-1 justify-center items-center p-4">
			{HexagonContainersData.map(
				({ label, icon, className, onPress, testId }, index) => (
					<View key={label + index} className={className}>
						<HexagonContainer
							label={label}
							icon={icon}
							onPress={onPress}
							testId={testId}
						/>
					</View>
				),
			)}
		</View>
	);
};
