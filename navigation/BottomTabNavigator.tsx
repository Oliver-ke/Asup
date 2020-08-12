import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

// Navigators
import DashboardNavigator from './DashboardNavigator';
import UploadNavigator from './UploadNavigator';

// Only screen
import { ProfileScreen } from '../screens';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const TabBarIcon = (props: { name: string; color: string }) => {
	return <Feather size={30} style={{ marginBottom: -3 }} {...props} />;
};

export default function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="Dashboard"
			tabBarOptions={{
				activeTintColor: Colors[colorScheme].tint,
				style: { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
				keyboardHidesTabBar: true
			}}
		>
			<BottomTab.Screen
				name="Dashboard"
				component={DashboardNavigator}
				options={{
					title: 'Dashboard',
					tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
				}}
			/>
			<BottomTab.Screen
				name="Uploads"
				component={UploadNavigator}
				options={{
					title: 'Your Uploads',
					tabBarIcon: ({ color }) => <TabBarIcon name="upload" color={color} />
				}}
			/>
			<BottomTab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					title: 'Profile',
					tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />
				}}
			/>
		</BottomTab.Navigator>
	);
}
