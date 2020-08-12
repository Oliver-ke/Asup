import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UploadScreen, AddStudentScreen } from '../screens';
import { UploadParamList } from '../types';
const UploadStack = createStackNavigator<UploadParamList>();

const UploadNavigator = () => {
	return (
		<UploadStack.Navigator>
			<UploadStack.Screen name="Uploads" component={UploadScreen} options={{ headerShown: false }} />
			<UploadStack.Screen
				name="AddStudent"
				component={AddStudentScreen}
				options={{ headerTitle: 'Upload New Student' }}
			/>
		</UploadStack.Navigator>
	);
};

export default UploadNavigator;
