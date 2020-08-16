import React, { useState, FC, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { StudentContext, studentTypes } from '../../context/StudentContext';
import { prepareRegAssets } from '../../util/storageUtil';
import { StudentInfo, SchoolInfo, ParentInfo, StudentPix } from '../../components/forms';
import { AddStudentScreenNavigationProp } from '../../types';
import SubmitModal from '../../components/submitModal/SubmitModal';
import { uploadNow, clearStorage } from '../../util/uploadHandler';
import storageLogger from '../../util/storageLogger';
import styles from './styles';

type AddStudentScreenProps = {
	navigation: AddStudentScreenNavigationProp;
};

const AddStudentScreen: FC<AddStudentScreenProps> = ({ navigation }) => {
	const [ step, setStep ] = useState(1);
	const [ showSubmitModal, setShowSubmitModal ] = useState(false);

	const [ regAssets, setRegAssets ] = useState({
		accademicSession: [],
		classes: [],
		states: [],
		localGov: []
	});

	const { state: { schoolID, authToken } } = useContext(AuthContext);
	const { studentDispatch, studentState: { studentInfo, parentInfo, schoolInfo, studentPix } } = useContext(
		StudentContext
	);

	// get registration assets
	useEffect(() => {
		(async () => {
			const res = await prepareRegAssets(schoolID, authToken);
			if (res && res.assets) {
				setRegAssets(res.assets);
				await clearStorage();
				storageLogger();
			}	
		})();
	}, []);

	const onNext = () => {
		if (step <= 3) {
			setStep(step + 1);
		}
		if (step === 4) {
			setShowSubmitModal(true);
		}
	};
	const onPrev = () => {
		if (step > 1 && step <= 4) {
			return setStep(step - 1);
		}
	};

	const handleUploadPress = async () => {
		const dataPayload = { ...studentInfo, ...schoolInfo, ...parentInfo };
		try {
			const res = await uploadNow(dataPayload, studentPix, authToken);
			studentDispatch({ type: studentTypes.RESET_DATA });
			console.log(res);
			setShowSubmitModal(false);
			navigation.navigate('Uploads');
		} catch (error) {
			console.log(error);
			// show error
		}
	};
	const handleSavePress = () => {
		const dataPayload = { ...studentInfo, ...schoolInfo, ...parentInfo };
		console.log(dataPayload);
		studentDispatch({ type: studentTypes.RESET_DATA });
		setShowSubmitModal(false);
	};

	return (
		<View style={styles.container}>
			{step === 1 ? (
				<StudentInfo
					localGov={regAssets.localGov}
					states={regAssets.states}
					navigation={navigation}
					onNextPress={onNext}
					onPrevPress={onPrev}
				/>
			) : step === 2 ? (
				<SchoolInfo
					classes={regAssets.classes}
					accademicSession={regAssets.accademicSession}
					onNextPress={onNext}
					onPrevPress={onPrev}
				/>
			) : step === 3 ? (
				<ParentInfo onNextPress={onNext} onPrevPress={onPrev} />
			) : step === 4 ? (
				<StudentPix onNextPress={onNext} onPrevPress={onPrev} />
			) : null}

			<SubmitModal onSavePress={handleSavePress} onUploadPress={handleUploadPress} showModal={showSubmitModal} />
		</View>
	);
};

export default AddStudentScreen;
