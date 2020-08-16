import React, { FC, ReactElement, useContext, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { StepHandlerProps } from './types';
import { Text } from 'react-native-elements';
import { StudentContext, studentTypes } from '../../context/StudentContext';
import Button from '../Button/Button';
import TextInput from '../textInput/TextInput';
import SelectionInput from '../selectionInput/SelectionInput';

import styles from './styles';

const GuardianRelation = [
	{label: "Uncle", value: "Uncle"},
	{label: "Father", value: "Father"},
	{label: "Mother", value: "Mother"},
	{label: "Sister", value: "Sister"},
	{label: "Brother", value: "Brother"},
]

const genderOptions = [
	{label: "Male", value: "Male"},
	{label: "Female", value: "Female"}
]

const ParentInfo: FC<StepHandlerProps> = ({ onNextPress, onPrevPress }): ReactElement => {
	const { studentDispatch, studentState: { parentInfo } } = useContext(StudentContext);
	const [inputs, setInputs] = useState({...parentInfo})
	const onInputChange = (name: string, value: any) => setInputs({...inputs, [name]: value});
	const onComplete = () => {
		// run validation
		console.log(inputs);
		studentDispatch({type: studentTypes.SET_PARENT_INFO, payload: inputs});
		onNextPress && onNextPress();
	}
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
			<Text h4Style={styles.headerText} h4>
				Guardian Details
			</Text>
			<View>
				<TextInput value={inputs.GuardianFirstName} onChangeText={(val) => onInputChange('GuardianFirstName', val)} placeholder="enter guardian first name" label="First Name" />
				<TextInput value={inputs.GuardianLastName} onChangeText={(val) => onInputChange('GuardianLastName', val)} placeholder="enter guardian last name" label="Last Name" />
				<TextInput value={inputs.GuardianOtherName} onChangeText={(val) => onInputChange('GuardianOtherName', val)} placeholder="enter guardian other name" label="Other Name" />
				<SelectionInput selectedValue={inputs.GuardianGender} setFieldValue={(val) => onInputChange('GuardianGender', val)} label="guardian gender" options={genderOptions} />
				<TextInput value={inputs.GuardianPhoneNo} keyboardType="numeric" onChangeText={(val) => onInputChange('GuardianPhoneNo', val)} placeholder="enter guardian phone number" label="Phone Number" />
				<TextInput value={inputs.GuardianEmailAddress} onChangeText={(val) => onInputChange('GuardianEmailAddress', val)} placeholder="enter guardian email address" label="Email Address" />
				<SelectionInput selectedValue={inputs.YearOfAdmission} setFieldValue={(val) => onInputChange('GuardianRelationship', val)} label="relationship with student" options={GuardianRelation} />
				<TextInput value={inputs.GuardianAddress} onChangeText={(val) => onInputChange('GuardianAddress', val)} placeholder="enter guardian house address" label="House Address" />
			</View>
			<View style={styles.controls}>
				<Button
					containerStyle={{ width: '45%' }}
					icon={{ type: 'ionicon', name: 'ios-arrow-round-back', color: '#000' }}
					iconContainerStyle={{ top: 2, right: 5 }}
					customOutline={true}
					onPress={onPrevPress}
					title="Previous"
				/>
				<Button
					icon={{ type: 'ionicon', name: 'ios-arrow-round-forward', color: '#fff' }}
					iconContainerStyle={{ top: 2, left: 5 }}
					containerStyle={{ width: '45%' }}
					onPress={onComplete}
					title="Upload"
					iconRight={true}
				/>
			</View>
			</ScrollView>
		</View>
	);
};

export default ParentInfo;
