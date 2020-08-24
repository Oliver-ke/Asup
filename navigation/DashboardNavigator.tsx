import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardParamList } from '../types';
import { HomeScreen, DetailScreen } from '../screens';
import { useNavigation } from '@react-navigation/native';
const DashboardStack = createStackNavigator<DashboardParamList>();

const DashboardNavigator = () => {
	const navigation = useNavigation();
	const handleNavigateParent = (parentName:string, screenName:string) => {
		navigation.navigate(parentName, {screen: screenName});
	}
	return (
		<DashboardStack.Navigator>
			<DashboardStack.Screen name="Home" options={{ headerShown: false }}>
				{(props) => <HomeScreen navigateParent={handleNavigateParent} {...props} />}
			</DashboardStack.Screen>
			<DashboardStack.Screen
				name="Detail"
				component={DetailScreen}
				options={{ headerTitle: 'Registration Details' }}
			/>
		</DashboardStack.Navigator>
	);
};

export default DashboardNavigator;
