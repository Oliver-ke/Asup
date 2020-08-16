import React, { FC, ReactElement, useState, useContext } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import Button from '../Button/Button';
import { StudentContext, studentTypes } from '../../context/StudentContext';
import { AuthContext } from '../../context/AuthContext';
import CustomImagePicker from '../imagePicker/ImagePicker';
import { StepHandlerProps } from './types';
import styles from './styles';

const StudentPix: FC<StepHandlerProps> = ({ onPrevPress, onNextPress }): ReactElement => {
	const { studentDispatch, studentState: { studentPix } } = useContext(StudentContext);
	const { state: { schoolCode } } = useContext(AuthContext);
    const [ selectedImage, setSelectedImage ] = useState(studentPix.ImageData);
    
	const handleImageSelected = (img: any) => {
		setSelectedImage(img);
	};
	const onComplete = () => {
		const payload = { ...studentPix, ImageData: selectedImage, SchoolCode: schoolCode };
		studentDispatch({ type: studentTypes.SET_STUDENT_PIX, payload });
		onNextPress && onNextPress();
	};
	return (
		<View style={[ styles.container, styles.containerStudentPix ]}>
			<Text h4Style={styles.headerText} h4>
				Add Student Picture
			</Text>
			<View style={styles.contenContainer}>
				<CustomImagePicker initialValue={selectedImage} onImageSelected={handleImageSelected} />
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
					title="Complete"
					iconRight={true}
				/>
			</View>
		</View>
	);
};

export default StudentPix;
