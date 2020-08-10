import React, { FC, ReactElement } from 'react';
import { View,} from 'react-native';
import { ButtonProps, Button } from 'react-native-elements';
import style from './style';
const ActionButton: FC<ButtonProps> = ({ ...props }): ReactElement => {
	return (
		<View style={style.container}>
			<Button raised={true} buttonStyle={style.btnStyle} containerStyle={style.btnContainer} {...props} />
		</View>
	);
};

export default ActionButton;
