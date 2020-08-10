import React, { FC, ReactElement } from 'react';
import { Button as RElementBtn } from 'react-native-elements';
import { CustomBtnProps } from './types';
import styles from './styles';

const Button: FC<CustomBtnProps> = ({ ...props }): ReactElement => {
	const { customOutline, ...rest } = props;
	return (
		<RElementBtn
			buttonStyle={customOutline ? styles.buttonStyleOutline : styles.buttonStyle}
            containerStyle={customOutline ? styles.containerStyleOutline : styles.containerStyle}
            titleStyle={customOutline ? styles.titleStyleOutline : styles.titleStyle}
			{...rest}
		/>
	);
};

export default Button;
