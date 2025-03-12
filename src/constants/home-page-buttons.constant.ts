import { NavigationRoutes } from './navigation.routes.enum';

import { DiscoverIcon } from '@/components/assets/icons/DiscoverIcon';
import { ForumIcon } from '@/components/assets/icons/ForumIcon';
import { GalleryIcon } from '@/components/assets/icons/GalleryIcon';
import { ProfileIcon } from '@/components/assets/icons/ProfileIcon';
import { WalletIcon } from '@/components/assets/icons/WalletIcon';

export const HOME_BUTTONS = [
	{
		label: 'Forum',
		icon: ForumIcon,
		className: 'absolute top-[179.28px] left-[98px] h-[128.66px] w-[111px]',
		route: NavigationRoutes.FORUM,
		testId: 'forumContainer',
	},
	{
		label: 'Gallery',
		icon: GalleryIcon,
		className: 'absolute top-[285px] left-[37.11px] h-[128.66px] w-[111px]',
		route: NavigationRoutes.GALLERY,
		testId: 'galleryContainer',
	},
	{
		label: 'Discover',
		icon: DiscoverIcon,
		className: 'absolute top-[285px] left-[157px] h-[128.66px] w-[111px]',
		route: NavigationRoutes.DISCOVER,
		testId: 'discoverContainer',
	},
	{
		label: 'Wallet',
		icon: WalletIcon,
		className: 'absolute top-[391px] left-[98.11px] h-[128.66px] w-[111px]',
		route: NavigationRoutes.WALLET,
		testId: 'walletContainer',
	},
	{
		label: 'Profile',
		icon: ProfileIcon,
		className: 'absolute top-[391px] left-[221.11px] h-[128.66px] w-[111px]',
		route: NavigationRoutes.PROFILE,
		testId: 'profileContainer',
	},
];
