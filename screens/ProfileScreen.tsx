import React, { useContext } from 'react';
import constants from 'expo-constants';
import colors from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Feather } from '@expo/vector-icons'; 
import { Button } from 'react-native-elements';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';

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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: constants.statusBarHeight
	},
	header: {
		padding: 20,
		backgroundColor: colors.light.primaryColor,
		justifyContent: 'center',
		flex: 1
	},
	headerText: {
		fontSize: 20,
		color: '#fff',
		textAlign: 'center'
	},
	iconWrapper: {
		backgroundColor: '#F7F7F7',
		justifyContent: 'center',
		flexDirection: 'row',
		marginBottom: 30
	},
	fieldContainer: {
		marginBottom: 5,
		backgroundColor: '#F7F7F7',
		flex: 9,
		justifyContent: 'center',
		paddingHorizontal: 20
	},
	formContainer: {
		backgroundColor: '#fff',
		paddingHorizontal: 15,
		paddingVertical: 25,
		borderRadius: 10
	},
	fieldWrapper: {
		flexDirection: 'row',
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
		paddingVertical: 20,
		paddingHorizontal: 10
	},
	text: {
		fontSize: 18,
		fontFamily: 'lato',
		color: 'rgba(0,0,0,0.6)'
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%'
	},
});

export default Profile;
