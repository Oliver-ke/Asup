import React, { FC, useState, ReactText } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { SelectProps } from './types';
import { Picker } from '@react-native-community/picker';

const SelectionInput: FC<SelectProps> = ({ options, setFieldValue, label }) => {
	const [ gender, setGender ] = useState<ReactText>('Java');
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<View style={styles.pickerContainer}>
				<Picker
					selectedValue={gender}
					style={{ height: 43, width: '100%'}}
					onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
				>
					{options.map(({ label, value }, idx) => <Picker.Item key={idx} label={label} value={value} />)}
				</Picker>
			</View>
		</View>
	);
};

export default SelectionInput;
