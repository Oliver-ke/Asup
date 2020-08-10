import React, { FC } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { Entypo } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { SelectProps } from './types';

const SelectionInput: FC<SelectProps> = ({ options, setFieldValue, label }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<RNPickerSelect
				onValueChange={(e) => console.log(e) }
				style={{
					...styles.inputAndroid,
					iconContainer: styles.iconStyle
				}}
				placeholder={{
					label: `select ${label.toLowerCase()}`,
					value: null,
					color: 'rgba(0,0,0,0.6)'
				}}
				Icon={() => {
					return <Entypo name="chevron-small-down" size={24} color="gray" />;
				}}
				useNativeAndroidPickerStyle={false}
				items={options}
			/>
		</View>
	);
};

export default SelectionInput;
