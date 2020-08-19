import React, { FC, ReactElement } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather, AntDesign, Entypo } from '@expo/vector-icons';
import { StudentCardProp } from './types';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Card: FC<StudentCardProp> = ({ student }): ReactElement => {
	const {
		uploadID,
		LastName,
		FirstName,
		uploaded,
		AdmissionDate,
		Gender,
		GuardianAddress,
		studentPix: { ImageData }
	} = student;
	const navigation = useNavigation();
	return (
		<TouchableOpacity onPress={() => navigation.navigate('Detail', { uploadID, uploaded })} style={styles.card}>
			<View style={styles.cardImg}>
				<Image style={{ width: 60, height: 60, resizeMode: 'cover' }} source={{ uri: ImageData }} />
			</View>
			<View style={styles.detail}>
				<Text style={styles.name}>{`${LastName} ${FirstName}`}</Text>
				<Text style={styles.class}>{Gender}</Text>
				<Text style={styles.class}>{GuardianAddress}</Text>
			</View>
			<View style={styles.property}>
				<Text style={styles.nextBtn}>
					<Entypo name="dots-three-horizontal" size={24} color="rgba(0,0,0,0.7)" />
				</Text>
				<Text style={{ ...styles.textProperty, color: '#000' }}>
					{new Date(AdmissionDate).toLocaleDateString()}
				</Text>
				{uploaded ? (
					<Text
						style={{
							...styles.textProperty,
							...styles.status,
							color: 'green'
						}}
					>
						Uploaded <Feather name="check" size={12} color="green" />
					</Text>
				) : (
					<Text
						style={{
							...styles.textProperty,
							...styles.status,
							color: 'red'
						}}
					>
						Waiting <AntDesign name="retweet" size={12} color="red" />
					</Text>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default Card;
