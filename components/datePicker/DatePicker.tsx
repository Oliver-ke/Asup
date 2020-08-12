import React, { FC, ReactElement, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DatePicker from '@react-native-community/datetimepicker';
import {datePickerProps} from './types';
import styles from './styles';

const DatePickerCustom :FC<datePickerProps> = ({initialDate, lable, onChangeHandler}) :ReactElement => {
	const [ date, setDate ] = useState(initialDate||new Date());
	const [ showWiget, setShowWidget ] = useState(false);

	const handleOnChange = (e:any, selectedDate: any) => {
		const currentDate = selectedDate || date;
		setShowWidget(false);
		setDate(currentDate);
		onChangeHandler(currentDate);
	};
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{lable}</Text>
			<TouchableOpacity activeOpacity={0.7} onPress={() => setShowWidget(true)} style={styles.picker}>
				{showWiget && <DatePicker mode="date" onChange={handleOnChange} value={date} />}
				<Text>{date.toLocaleDateString()}</Text>
				<AntDesign name="calendar" size={20} color="black" />
			</TouchableOpacity>
		</View>
	);
};

export default DatePickerCustom;
