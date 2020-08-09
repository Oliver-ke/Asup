import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UploadParamList } from '../types';
import UploadScreen from '../screens/UploadScreen';
import AddStudentScreen from '../screens/AddStudentScreen';

const UploadStack = createStackNavigator<UploadParamList>();

const UploadNavigator= () =>{
  return (
    <UploadStack.Navigator>
      <UploadStack.Screen
        name="Uploads"
        component={UploadScreen}
        options={{headerShown: false}}
      />
       <UploadStack.Screen
        name="AddStudent"
        component={AddStudentScreen}
        options={{ headerTitle: 'Upload New Student' }}
      />
    </UploadStack.Navigator>
  );
}

export default UploadNavigator;