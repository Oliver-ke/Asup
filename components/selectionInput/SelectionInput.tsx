import React, { FC, useState, ReactText, useEffect } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { SelectProps } from './types';
import { Picker } from '@react-native-community/picker';

const SelectionInput: FC<SelectProps> = ({ options, setFieldValue, label, selectedValue }) => {
	const [ value, setValue ] = useState<ReactText>(selectedValue || '');
	const handleOnchange = (itemValue:any, itemIndex:any) => {
		setValue(itemValue);
	 	setFieldValue && setFieldValue(itemValue);
	}
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<View style={styles.pickerContainer}>
				<Picker
					selectedValue={value}
					style={{ height: 43, width: '100%'}}
					onValueChange={handleOnchange}
				>
					{options.map(({ label, value }, idx) => <Picker.Item key={idx} label={label} value={value} />)}
				</Picker>
			</View>
		</View>
	);
};

export default SelectionInput;
