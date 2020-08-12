import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardParamList } from '../types';
import { HomeScreen } from '../screens';
const DashboardStack = createStackNavigator<DashboardParamList>();

const DashboardNavigator = () => {
	return (
		<DashboardStack.Navigator>
			<DashboardStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
		</DashboardStack.Navigator>
	);
};

export default DashboardNavigator;
