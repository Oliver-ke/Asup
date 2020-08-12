import React, { useContext } from 'react';
import colors from '../../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from '../../components/Themed';
import { Feather } from '@expo/vector-icons'; 
import { Button } from 'react-native-elements';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';

const Profile = () => {
	const { state, dispatch } = useContext(AuthContext);
	const { schoolCode, adminPhoneNumber, schoolID } = state;
	const handleLogout = async () => {
		try {
			await AsyncStorage.removeItem('userInfo');
			return dispatch({ type: 'LOGOUT' });
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#2D2254" style="light" />
			<View style={styles.header}>
				<Text style={styles.headerText}>Your Account</Text>
			</View>
			<View style={styles.fieldContainer}>
				<View style={styles.iconWrapper}>
				<Feather name="user" size={35} color={colors.light.secondaryColor} />
				</View>
				<View style={styles.formContainer}>
					<View style={styles.fieldWrapper}>
						<Text style={styles.text}>School Code: </Text>
						<Text style={[ styles.text, { color: '#000' } ]}>{schoolCode}</Text>
					</View>
					<View style={styles.fieldWrapper}>
						<Text style={styles.text}>Phone Number: </Text>
						<Text style={[ styles.text, { color: '#000' } ]}>{adminPhoneNumber}</Text>
					</View>
					<View style={styles.fieldWrapper}>
						<Text style={styles.text}>School ID: </Text>
						<Text style={[ styles.text, { color: '#000' } ]}>{schoolID}</Text>
					</View>
					<Button titleStyle={{ fontSize: 18 }}
						buttonStyle={{
							backgroundColor: colors.light.primaryColor,
							paddingVertical: 12,
							borderRadius: 10,
						}} onPress={handleLogout} title="Logout" />
				</View>
			</View>
		</View>
	);
};


export default Profile;
