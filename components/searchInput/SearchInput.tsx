import React, { FC, ReactElement, useState } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';

const SearchInput: FC<TextInputProps> = ({...props}): ReactElement => {
	const [ newStyles, setNewStyles ] = useState({ borderColor: '#392D60' });
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
				placeholder="Search Uploads"
			/>
		</View>
	);
};

export default SearchInput;
