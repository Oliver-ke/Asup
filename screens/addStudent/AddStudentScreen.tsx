import React, { useState, FC, useEffect, useContext } from 'react';
import { View, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { StudentContext, studentTypes } from '../../context/StudentContext';
import { prepareRegAssets } from '../../util/storageUtil';
import { StudentInfo, SchoolInfo, ParentInfo, StudentPix } from '../../components/forms';
import { AddStudentScreenNavigationProp } from '../../types';
import SubmitModal from '../../components/submitModal/SubmitModal';
import { uploadNow, saveForLater } from '../../util/uploadHandler';
import styles from './styles';

type AddStudentScreenProps = {
	navigation: AddStudentScreenNavigationProp;
};

const AddStudentScreen: FC<AddStudentScreenProps> = ({ navigation }) => {
	const [ step, setStep ] = useState(1);
	const [ showSubmitModal, setShowSubmitModal ] = useState(false);
	const [ uploadLoading, setUploadLoading ] = useState(false);
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
				studentDispatch({ type: studentTypes.RESET_DATA });
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
			setUploadLoading(true);
			const { success } = await uploadNow(dataPayload, studentPix, authToken);
			if (success) {
				studentDispatch({ type: studentTypes.RESET_DATA });
				setUploadLoading(false);
				setShowSubmitModal(false);
				Alert.alert('Upload Status', 'Uploading Student Successful');
				setStep(1);
				return navigation.navigate('Uploads');
			}
			throw new Error('Upload Failed');
		} catch (error) {
			console.log(error);
			setUploadLoading(false);
			setShowSubmitModal(false);
			Alert.alert('Upload Status', 'Error Making Upload');
			// show error
		}
	};

	const handleSavePress = async() => {
		const dataPayload = { ...studentInfo, ...schoolInfo, ...parentInfo };
		try {
			setUploadLoading(true);
			await saveForLater(dataPayload, studentPix);
			studentDispatch({ type: studentTypes.RESET_DATA });
			setUploadLoading(false);
			setShowSubmitModal(false);
			Alert.alert('Upload Status', 'Upload Successfully Saved for Later');
			setStep(1);
		    navigation.navigate('Uploads');
		} catch (error) {
			console.log(error);
			setUploadLoading(false);
			setShowSubmitModal(false);
			Alert.alert('Upload Status', 'Error Saving Upload');
		}
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

			<SubmitModal
				isLoading={uploadLoading}
				onSavePress={handleSavePress}
				onUploadPress={handleUploadPress}
				showModal={showSubmitModal}
			/>
		</View>
	);
};

export default AddStudentScreen;
