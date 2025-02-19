import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export const HomeComponent = () => {
	const [greeting, setGreeting] = React.useState('');
	const data = () => {
		fetch(`${process.env.EXPO_PUBLIC_API_URL}/hello`)
			.then((res) => {
				return res;
			})
			.then((res) => res.json())
			.then((res) => setGreeting(res.greeting))
			.catch((err) => console.log(err))
			.finally(() => console.log(greeting));
	};

	React.useEffect(() => {
		data();
	}, []);

	return (
		<ScrollView>
			<View testID="welcome-view">
				<Text className="p-5 font-bold">{greeting}</Text>
			</View>
		</ScrollView>
	);
};
