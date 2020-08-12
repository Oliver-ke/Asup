import React, { useReducer, useContext, useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ColorSchemeName, ActivityIndicator, View } from 'react-native';
import { AuthProvider, reducer, initialState, AuthContext } from '../context/AuthContext';
import {
	StudentProvider,
	initialState as studentInitState,
	reducer as studentReducer
} from '../context/StudentContext';
import {LoginScreen} from '../screens';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import AsyncStorage from '@react-native-community/async-storage';

// this is the app root
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	const [ studentState, studentDispatch ] = useReducer(studentReducer, studentInitState);
	return (
		<AuthProvider value={{ state, dispatch }}>
			<StudentProvider value={{ studentState, studentDispatch }}>
				<NavigationContainer
					linking={LinkingConfiguration}
					theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
				>
					<RootNavigator />
				</NavigationContainer>
			</StudentProvider>
		</AuthProvider>
	);
}

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
	const { state: { isAuthenticated }, dispatch } = useContext(AuthContext);
	const [authLoading, setAuthLoading ] = useState(true);
	useEffect(() => {
		(async () => {
			try {
				const userInfoStr = await AsyncStorage.getItem('userInfo');
				if (userInfoStr) {
					const userInfo = JSON.parse(userInfoStr);
					const savedState = { ...userInfo };
					dispatch({ type: 'LOGIN', payload: savedState });
					setAuthLoading(false);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	if(authLoading){
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" color="#2D2254" />
			</View>
		)
	}
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{isAuthenticated ? (
				<Stack.Screen name="Root" component={BottomTabNavigator} />
			) : (
				<Stack.Screen name="Login" component={LoginScreen} />
			)}
		</Stack.Navigator>
	);
};
