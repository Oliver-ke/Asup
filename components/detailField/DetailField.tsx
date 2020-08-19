import React, {FC, ReactElement } from 'react';
import { View, Text} from 'react-native';
import styles from './styles';

type fieldType = {
    label: string;
    value: string | number;
}

const Field :FC<fieldType>= ({ label, value }) :ReactElement => {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldText}>{label}</Text>
      <Text style={[styles.fieldText, styles.fieldValueText]}>{value}</Text>
    </View>
  )
}

export default Field;

