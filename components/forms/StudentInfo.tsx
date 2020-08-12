import React, { FC, ReactElement, useState, ReactText } from 'react';
import { View } from 'react-native';
import { StudentInfoProps } from './types';
import { Text } from 'react-native-elements';
import TextInput from '../textInput/TextInput';
import Button from '../Button/Button';
import styles from './styles';
import SelectionInput from '../selectionInput/SelectionInput';
import DatePicker from '../datePicker/DatePicker';
import { ScrollView } from 'react-native-gesture-handler';

const StudentInfo: FC<StudentInfoProps> = ({ onNextPress, navigation, states, localGov, countries }): ReactElement => {
	console.log(states);
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
			<Text h4Style={styles.headerText} h4>
				Student Details
			</Text>
			<View>
				<TextInput placeholder="enter student first name" label="First Name" />
				<TextInput placeholder="enter student last name" label="Last Name" />
				<TextInput placeholder="student other names" label="Other Name" />
				<SelectionInput label="Gender" options={[{label: 'Male', value:'Male'}, {label: 'Female', value:'Female'}]} />
				<DatePicker lable="Date of Birth" onChangeHandler={(val) => console.log(val)} />
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
					onPress={onNextPress}
					title="Next"
					iconRight={true}
				/>
			</View>
			</ScrollView>
		</View>
	);
};

export default StudentInfo;
