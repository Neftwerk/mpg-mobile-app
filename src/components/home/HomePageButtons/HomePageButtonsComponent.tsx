import { View } from 'react-native';

import { HexagonButton } from './HexagonButton';

import { HOME_BUTTONS } from '@/constants/home-page-buttons.constant';

export const HomePageButtonsComponent = () => {
	return (
		<View className="flex-1 justify-center items-center p-4">
			{HOME_BUTTONS.map(({ label, icon, className, route, testId }, index) => (
				<View key={label + index} className={className}>
					<HexagonButton
						label={label}
						icon={icon}
						route={route}
						testId={testId}
					/>
				</View>
			))}
		</View>
	);
};
