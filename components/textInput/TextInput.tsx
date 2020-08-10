import React, { FC, ReactElement, useState } from 'react';
import { Input, InputProps } from 'react-native-elements';
import styles from './styles';

const TextInput: FC<InputProps> = ({ ...props }): ReactElement => {
    const [newBorder, setNewBorder] = useState({borderColor: '#ccc'});
    const toggleBorder = () => {
        const {borderColor} = newBorder;
        if(borderColor === '#ccc'){
            return setNewBorder({borderColor: 'rgba(45, 34, 84, 0.7)'})
        }
        return setNewBorder({borderColor: '#ccc'})
    }
	return (
		<Input
            onFocus={toggleBorder}
            onBlur={toggleBorder}
            selectionColor={"rgb(45, 34, 84)"}
			labelStyle={styles.labelStyle}
            inputStyle={styles.inputStyle}
            inputContainerStyle={[styles.inputContainerStyle, newBorder]}
			containerStyle={styles.containerStyle}
			errorStyle={styles.errorStyle}
			{...props}
		/>
	);
};

export default TextInput;

/**
 * containerStyle: {},
    inputContainerStyle: {},
    errorStyle: {},
    inputStyle: {},
    labelStyle: {}
 */
