import { ImageBackground } from 'react-native';

import { arrowBackIcon } from '../index';

interface IArrowBackIconProps {
	testID?: string;
}

export const ArrowBackIcon = ({ testID }: IArrowBackIconProps) => {
	return (
		<ImageBackground
			testID={testID}
			source={arrowBackIcon}
			style={{ width: 18, height: 14, marginLeft: 5, marginRight: 5 }}
		/>
	);
};
