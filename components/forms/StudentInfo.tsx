import React, { FC, ReactElement, useState, ReactText } from 'react';
import { View,Picker } from 'react-native';
import { StepHandlerProps } from './types';
import { Text } from 'react-native-elements';
import TextInput from '../textInput/TextInput';
import Button from '../Button/Button';
import styles from './styles';
//import {Picker} from '@react-native-community/picker';

const StudentInfo: FC<StepHandlerProps> = ({ onNextPress, navigation }): ReactElement => {
	const [gender, setGender] = useState<ReactText>('java');
	return (
		<View style={styles.container}>
			<Text h4Style={styles.headerText} h4>
				Student Details
			</Text>
			<View>
				<TextInput placeholder="enter student first name" label="First Name" />
				<TextInput placeholder="enter student last name" label="Last Name" />
				<TextInput placeholder="student other names" label="Other Name" />
				<Picker
                    selectedValue={gender}
					style={{height: 50, width: 100}}
					onValueChange={(itemValue, itemIndex) =>
					setGender(itemValue)
                   }>
					<Picker.Item label="Java" value="java" />
					<Picker.Item label="JavaScript" value="js" />
				</Picker>
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
		</View>
	);
};

export default StudentInfo;
