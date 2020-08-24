import React, {FC, ReactElement} from 'react';
import {TouchableOpacity} from 'react-native';
import {homeNavButtonType} from './types';
import { Text, Icon} from 'react-native-elements';
import styles from './styles';


const HomeNavButton :FC<homeNavButtonType> =({clickHandler, color, text, icon}) :ReactElement => {
    return (
        <TouchableOpacity onPress={() => clickHandler()} activeOpacity={0.6} style={{...styles.wrapper, backgroundColor: color}}>
            <Icon {...icon} />
            <Text h4 h4Style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    )  
}

export default HomeNavButton;