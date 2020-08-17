import React, { FC, ReactElement, useState, useContext} from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { SchoolInfoProps } from './types';
import { StudentContext, studentTypes } from '../../context/StudentContext';
import Button from '../Button/Button';
import SelectionInput from '../selectionInput/SelectionInput';
import DatePicker from '../datePicker/DatePicker';
import styles from './styles';

const termAdmitted = [
	{ label: 'First Term', value: 1 },
	{ label: 'Second Term', value: 2 },
	{ label: 'Third Term', value: 3 }
];

const SchoolInfo: FC<SchoolInfoProps> = ({ onNextPress, onPrevPress, classes, accademicSession }): ReactElement => {
	const { studentDispatch, studentState: { schoolInfo } } = useContext(StudentContext);
	const [ inputs, setInputs ] = useState({...schoolInfo});
	const onInputChange = (name: string, value: any) => setInputs({ ...inputs, [name]: value });
	const onComplete = () => {
		console.log(inputs);
		const { AdmissionDate, ClassAdmittedID, TermAdmitted, YearOfAdmission, CurrentClassID } = inputs;
		if (!AdmissionDate || !ClassAdmittedID || !TermAdmitted || !YearOfAdmission || !CurrentClassID) {
			//return;
			console.log(inputs);
		}
		studentDispatch({ type: studentTypes.SET_SCHOOL_INFO, payload: inputs });
		onNextPress && onNextPress();
	};
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<Text h4Style={styles.headerText} h4>
					School Details
				</Text>
				<View>
					<SelectionInput
						selectedValue={inputs.TermAdmitted}
						label="Term Admitted"
						setFieldValue={(val) => onInputChange('TermAdmitted', val)}
						options={termAdmitted}
					/>
					<SelectionInput
						selectedValue={inputs.ClassAdmittedID}
						setFieldValue={(val) => onInputChange('ClassAdmittedID', val)}
						label="Class Admitted"
						options={classes}
					/>
					<SelectionInput
						selectedValue={inputs.CurrentClassID}
						setFieldValue={(val) => onInputChange('CurrentClassID', val)}
						label="Student Current Class"
						options={classes}
					/>
					<DatePicker initialDate={inputs.AdmissionDate} lable="Admission Date" onChangeHandler={(val) => onInputChange('AdmissionDate', val)} />
					<SelectionInput
						selectedValue={inputs.YearOfAdmission}
						setFieldValue={(val) => onInputChange('YearOfAdmission', val)}
						label="Year of Admission"
						options={accademicSession}
					/>
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
						title="Next"
						iconRight={true}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

export default SchoolInfo;
