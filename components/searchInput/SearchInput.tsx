import React, { FC, ReactElement, useState } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';

interface searchInputProps extends TextInputProps {
	onSubmit: (query: string) => void;
}

const SearchInput: FC<searchInputProps> = ({onSubmit,...props}): ReactElement => {
	const [ newStyles, setNewStyles ] = useState({ borderColor: '#392D60' });
	const [input, setInput] = useState('');
	const handleInputChange = (txt:string) => {
		setInput(txt);
		if(txt === '') return onSubmit('');
	}
	const toggleBorderColor = () => {
		const { borderColor } = newStyles;
		if (borderColor === '#7F6FA9') {
			return setNewStyles({ borderColor: '#392D60' });
		}
		return setNewStyles({ borderColor: '#7F6FA9' });
	};
	return (
		<View style={[ styles.container, newStyles ]}>
			<Ionicons name="ios-search" size={24} color="#fff" />
			<TextInput
                {...props}
				onBlur={toggleBorderColor}
				onFocus={toggleBorderColor}
				style={styles.input}
				value={input}
				onChangeText={handleInputChange}
				placeholder="Search Uploads"
				onSubmitEditing={({nativeEvent: {text}}) =>  onSubmit(text)}
			/>
		</View>
	);
};

export default SearchInput;
