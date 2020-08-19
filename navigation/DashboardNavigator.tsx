import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardParamList } from '../types';
import { HomeScreen, DetailScreen } from '../screens';
const DashboardStack = createStackNavigator<DashboardParamList>();

const DashboardNavigator = () => {
	return (
		<DashboardStack.Navigator>
			<DashboardStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
			<DashboardStack.Screen
				name="Detail"
				component={DetailScreen}
				options={{ headerTitle: 'Registration Details' }}
			/>
		</DashboardStack.Navigator>
	);
};

export default DashboardNavigator;
