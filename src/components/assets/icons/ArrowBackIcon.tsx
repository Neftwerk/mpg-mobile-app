import { ImageBackground } from 'react-native';

import { arrowBackIcon } from '../index';

export const ArrowBackIcon = ({ testID }: { testID?: string }) => {
	return (
		<ImageBackground
			testID={testID}
			source={arrowBackIcon}
			style={{ width: 18, height: 14, marginLeft: 5, marginRight: 5 }}
		/>
	);
};
