import React, { FC, ReactElement, Fragment } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { Text } from 'react-native-elements';
import Button from '../../components/Button/Button';
import { submitModalProps } from './types';
import styles from './styles';

const SubmitModal: FC<submitModalProps> = ({ onSavePress, showModal, onUploadPress, isLoading }): ReactElement => {
	return (
		<Modal isVisible={showModal}>
			<View style={styles.modalContent}>
				{isLoading ? (
					<Fragment>
						<ActivityIndicator />
						<Text style={styles.loadingTxt}>Uploading...</Text>
					</Fragment>
				) : (
					<Fragment>
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
					</Fragment>
				)}
			</View>
		</Modal>
	);
};

export default SubmitModal;
