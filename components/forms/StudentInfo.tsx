import React, { FC, ReactElement, useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { StudentInfoProps } from './types';
import { Text } from 'react-native-elements';
import TextInput from '../textInput/TextInput';
import { AuthContext } from '../../context/AuthContext';
import Button from '../Button/Button';
import styles from './styles';
import SelectionInput from '../selectionInput/SelectionInput';
import DatePicker from '../datePicker/DatePicker';
import { ScrollView } from 'react-native-gesture-handler';
import { StudentContext, studentTypes } from '../../context/StudentContext';

const StudentInfo: FC<StudentInfoProps> = ({ onNextPress, navigation, states, localGov }): ReactElement => {
	const { studentDispatch, studentState: { studentInfo } } = useContext(StudentContext);
	const [input, setInput] = useState({ ...studentInfo });
	const [filteredLGA, setFilteredLGA] = useState<any>(localGov);
	const { state: { schoolCode: SchoolCode } } = useContext(AuthContext);
	const onInputChange = (name: string, value: any) => setInput({ ...input, [name]: value });

	// filter localgov on state change
	useEffect(() => {
		// run filter
		const filtered = localGov.filter(({ stateID }) => stateID === input.StateOfOriginID);
		setFilteredLGA(filtered);
	}, [input.StateOfOriginID])

	const onComplete = () => {
		// run data validation
		console.log(input);
		const { LastName, FirstName, OtherName, Gender, DateOfBirth, StateOfOriginID, LGAOfOriginID } = input;
		if (!LastName || !FirstName || !OtherName || !Gender || !DateOfBirth || !StateOfOriginID || !LGAOfOriginID) {
			//return;
			console.log(input);
		}
		studentDispatch({ type: studentTypes.SET_STUDENT_INFO, payload: { ...input, SchoolCode } });
		onNextPress && onNextPress();
	}

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<Text h4Style={styles.headerText} h4>
					Student Details
			    </Text>
				<View>
					<TextInput value={input.FirstName} onChangeText={(val) => onInputChange('FirstName', val)} placeholder="enter student first name" label="First Name" />
					<TextInput value={input.LastName} onChangeText={(val) => onInputChange('LastName', val)} placeholder="enter student last name" label="Last Name" />
					<TextInput value={input.OtherName} onChangeText={(val) => onInputChange('OtherName', val)} placeholder="student other names" label="Other Name" />
					<SelectionInput selectedValue={input.Gender} label="Gender" setFieldValue={(val) => onInputChange('Gender', val)} options={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }]} />
					<DatePicker initialDate={input.DateOfBirth} lable="Date of Birth" onChangeHandler={(val) => onInputChange('DateOfBirth', val)} />
					<SelectionInput selectedValue={input.StateOfOriginID} setFieldValue={(val) => onInputChange('StateOfOriginID', val)} label="State of Origin" options={states} />
					<SelectionInput selectedValue={input.LGAOfOriginID} setFieldValue={(val) => onInputChange('LGAOfOriginID', val)} label="LGA of Origin" options={filteredLGA} />
				</View>
				<View style={styles.controls}>
					<Button
						containerStyle={{ width: '45%' }}
						icon={{ type: 'ionicon', name: 'ios-arrow-round-back', color: '#000' }}
						iconContainerStyle={{ top: 2, right: 5 }}
						customOutline={true}
						onPress={() => navigation?.navigate('Uploads')}
						title="Cancel"
					/>
					<Button
						icon={{ type: 'ionicon', name: 'ios-arrow-round-forward', color: '#fff' }}
						iconContainerStyle={{ top: 2, left: 5 }}
						containerStyle={{ width: '45%' }}
						onPress={onComplete}
						title="Next"
						iconRight={true}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

export default StudentInfo;
