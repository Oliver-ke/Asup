import React, { FC, ReactElement } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { Text } from 'react-native-elements';
import Button from '../../components/Button/Button';
import { submitModalProps } from './types';
import styles from './styles';

const SubmitModal: FC<submitModalProps> = ({ onSavePress, showModal, onUploadPress }): ReactElement => {
	return (
		<Modal isVisible={showModal}>
			<View style={styles.modalContent}>
				<Text h4 h4Style={styles.headerText}>
					Registration Complete!
				</Text>
				<Text h4 h4Style={styles.extraText}>
					You can choose to either upload this student now or save and upload later
				</Text>
				<View style={styles.controllers}>
					<Button
						customOutline={true}
						containerStyle={{ width: '45%' }}
						onPress={onSavePress}
						title="Upload Later"
					/>
					<Button containerStyle={{ width: '45%' }} onPress={onUploadPress} title="Upload Now" />
				</View>
			</View>
		</Modal>
	);
};

export default SubmitModal;
