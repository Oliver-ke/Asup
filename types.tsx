import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Login: undefined;
};

export type BottomTabParamList = {
  Dashboard: undefined;
  Uploads: undefined;
  Profile: undefined;
};

export type DashboardParamList = {
  Home: undefined;
};

export type UploadParamList = {
  Uploads: undefined;
  AddStudent: undefined;
};


export type UploadScreenNavigationProp = StackNavigationProp<UploadParamList, 'Uploads'>
export type AddStudentScreenNavigationProp = StackNavigationProp<UploadParamList, 'AddStudent'>

