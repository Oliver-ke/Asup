import React, { FC, ReactElement, useContext } from 'react';
import { View } from 'react-native';
import { StepHandlerProps } from './types';
import { Button, Input, Text } from 'react-native-elements';
import { StudentContext } from '../../context/StudentContext';
import styles from './styles';
const ParentInfo: FC<StepHandlerProps> = ({ onNextPress, onPrevPress }): ReactElement => {
	const { studentDispatch } = useContext(StudentContext);
	return (
		<View style={styles.container}>
			<Text h4>Guardian Details</Text>
			<View>
				<Input placeholder="guardian first name" label="First Name" />
				<Input placeholder="guardian last name" label="Last Name" />
				<Input placeholder="guardian other names" label="Other Name" />
			</View>
			<Button onPress={onNextPress} title="Next" />
			<Button onPress={onPrevPress} title="Previous" />
		</View>
	);
};

export default ParentInfo;

/**
 * "GuardianFirstName": "JOHN",
"GuardianLastName": "UGBOEFI",
"GuardianOtherName": "CHUKWUEMEKA",
"GuardianGender": "Male",
"GuardianPhoneNo": "23480544555",
"GuardianEmailAddress": "john.ubo@gmail.com",
"GuardianRelationship": "Uncle",
"GuardianAddress": "3 Oweka Road"
 */