import React, {FC, ReactElement} from 'react';
import {View, Text} from 'react-native';
import {statCardProps} from './types';
import styles from './styles';

const StatCard :FC<statCardProps> = ({icon, iconContainerColor, cardBackground, title, titleColor, value}) : ReactElement => {
    return (
        <View style={{...styles.statisticsCard, backgroundColor: cardBackground}}>
        <View style={styles.iconWrapper}>
           <View style={{...styles.iconContainer, backgroundColor: iconContainerColor}}>
           {icon}
           </View>
        </View>
        <View style={styles.content}>
            <Text style={{...styles.title, color: titleColor}}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
        </View>
    </View>
    )
}

export default StatCard;