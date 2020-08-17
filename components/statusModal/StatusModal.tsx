import React, { FC, ReactElement } from 'react';
import { Text } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

const StatusModal: FC = (): ReactElement => {
	return (
		<Modal
			isVisible={true}
			onSwipeComplete={() => {}}
			swipeDirection={[ 'up', 'left', 'right', 'down' ]}
			style={styles.view}
		>
			<Text>This is the component</Text>
		</Modal>
	);
};


export default StatusModal;