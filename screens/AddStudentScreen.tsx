import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StudentInfo, SchoolInfo, ParentInfo } from '../components/forms';

const AddStudentScreen = () => {
	const [ step, setStep ] = useState(1);

	const onNext = () => {
		if (step <= 2) {
			setStep(step + 1);
		}
	};
	const onPrev = () => {
		if (step > 1 && step <= 3) {
			return setStep(step - 1);
		}
	};
	return (
		<View style={styles.container}>
			{step === 1 ? (
				<StudentInfo onNextPress={onNext} onPrevPress={onPrev} />
			) : step === 2 ? (
				<SchoolInfo onNextPress={onNext} onPrevPress={onPrev} />
			) : step === 3 ? (
				<ParentInfo onNextPress={onNext} onPrevPress={onPrev} />
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default AddStudentScreen;
