import React, { useState, FC, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { prepareRegAssets } from '../../util/storageUtil';
import { StudentInfo, SchoolInfo, ParentInfo } from '../../components/forms';
import { AddStudentScreenNavigationProp } from '../../types';
import styles from './styles';

type AddStudentScreenProps = {
	navigation: AddStudentScreenNavigationProp;
};

const AddStudentScreen: FC<AddStudentScreenProps> = ({ navigation }) => {
	const [ step, setStep ] = useState(1);
	const [ regAssets, setRegAssets ] = useState({
		accademicSession: {},
		classes: {},
		states: {},
		localGov: {},
		countries: {}
	});
	const { state: { schoolID, authToken } } = useContext(AuthContext);

	// get registration assets
	useEffect(() => {
		(async () => {
			const res = await prepareRegAssets(schoolID, authToken);
			if (res && res.assets) {
				setRegAssets(res.assets);
			}
		})();
	}, []);

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
				<StudentInfo
					countries={regAssets.countries}
					localGov={regAssets.localGov}
					states={regAssets.states}
					navigation={navigation}
					onNextPress={onNext}
					onPrevPress={onPrev}
				/>
			) : step === 2 ? (
				<SchoolInfo classes={regAssets.classes} onNextPress={onNext} onPrevPress={onPrev} />
			) : step === 3 ? (
				<ParentInfo onNextPress={onNext} onPrevPress={onPrev} />
			) : null}
		</View>
	);
};

export default AddStudentScreen;
