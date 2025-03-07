import Svg, { Path } from 'react-native-svg';

export const DiscoverIcon = ({
	width = 25,
	height = 26,
	testID,
}: {
	width?: number;
	height?: number;
	testID?: string;
}) => {
	return (
		<Svg
			width={width}
			height={height}
			viewBox="0 0 25 26"
			fill="none"
			testID={testID}
		>
			<Path
				d="M17.5646 17.0395L17.3619 17.2805L17.5802 17.5074L23.4966 23.6608C23.863 24.042 23.851 24.6505 23.47 25.0171L23.4699 25.0172C23.2905 25.1898 23.0551 25.2846 22.8054 25.2846C22.5415 25.2846 22.2974 25.1807 22.1141 24.9903L16.1529 18.7905L15.9449 18.5741L15.6994 18.7467C14.0657 19.8948 12.1561 20.4992 10.1505 20.4992C4.80962 20.4992 0.46377 16.1534 0.46377 10.8126C0.46377 5.47171 4.80962 1.12586 10.1505 1.12586C15.4913 1.12586 19.8371 5.47171 19.8371 10.8126C19.8371 13.0985 19.0329 15.294 17.5646 17.0395ZM17.9189 10.8126C17.9189 6.52865 14.4344 3.04413 10.1505 3.04413C5.86655 3.04413 2.38204 6.52865 2.38204 10.8126C2.38204 15.0965 5.86655 18.581 10.1505 18.581C14.4344 18.581 17.9189 15.0965 17.9189 10.8126Z"
				fill="#1A3F6C"
				stroke="#F2F3F7"
				stroke-width="0.7"
			/>
		</Svg>
	);
};
