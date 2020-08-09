import React, { FC, ReactElement } from 'react';
import { View, Text } from 'react-native';
import { StepHandlerProps } from './types';
import {Button} from 'react-native-elements';


const StudentInfo: FC<StepHandlerProps>  = ({ onNextPress, onPrevPress }): ReactElement => {
	return (
		<View>
			<Text>This is the Student info form</Text>
			<Button onPress={onNextPress} title="Next" />
			<Button onPress={onPrevPress} title="Previous" />
		</View>
	);
};

export default StudentInfo;