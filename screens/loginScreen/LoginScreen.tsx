import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from '../../constants/Colors';
import { LOGIN } from '../../constants/endpoint';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Buffer } from 'buffer';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, Image, Input, Text } from 'react-native-elements';
import {AuthContext} from '../../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import styles from './styles';

const LoginScreen = () => {
	const [ formInput, setFormInput ] = useState({
		SchoolCode: '',
		PassCode: '',
		AdminPhoneNumber: ''
    });
    const [loading, setLoading] = useState(false);
    const {dispatch} = useContext(AuthContext);
	const handleLoginClick = async () => {
		const { PassCode, AdminPhoneNumber, SchoolCode } = formInput;
		if (!PassCode || !AdminPhoneNumber || !SchoolCode) return;
		try {
            setLoading(true)
			const clientId = process.env.CLIENT_ID || '';
			const secretKey = process.env.SECRET_KEY || '';
			const key = new Buffer(`${clientId}:${secretKey}`).toString('base64');
			const payload = {
				PassCode,
				AdminPhoneNumber,
				SchoolCode,
				ChannelCode: '02',
				RequestType: 'SchoolAdmin'
			};
			const config = {
				headers: {
					Authorization: `Bearer ${key}`
				}
			};
			const {data: {authToken, adminPhoneNumber, schoolCode, schoolID}} = await axios.post(LOGIN, payload, config);
			// save to async storage and dispatch to store;
			const storePayload =  {authToken, adminPhoneNumber, schoolCode, schoolID}
			dispatch({type: 'LOGIN', payload: storePayload})
			const payloadStr = JSON.stringify(storePayload);
			await AsyncStorage.setItem("userInfo", payloadStr);
            setLoading(false);
		} catch (error) {
			// show error to user
            console.log(error);
            setLoading(false)
		}
	};
	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={colors.light.primaryColor} style="light" />
			<Spinner textStyle={{color: '#f4f4f4'}} visible={loading} textContent={'Loading...'} />
			<View style={styles.header}>
				<Image
					resizeMode="center"
					style={{ width: 100, height: 100 }}
					source={require('../../assets/images/logo.png')}
				/>
			</View>
			<KeyboardAwareScrollView contentContainerStyle={{ flex: 6 }}>
				<View style={styles.formInput}>
					<Text
						h4
						h4Style={{
							textAlign: 'center',
							fontFamily: 'lato',
							color: 'rgba(0,0,0,0.8)'
						}}
					>
						<MaterialCommunityIcons name="account-arrow-right-outline" size={24} color="#F5C42F" />
					</Text>
					<Text
						h4
						h4Style={{
							textAlign: 'center',
							fontFamily: 'lato',
							marginBottom: 30,
							color: 'rgba(0,0,0,0.8)'
						}}
					>
						Account Login
					</Text>
					<Input
						leftIcon={{ type: 'font-awesome', name: 'graduation-cap', size: 20, color: 'gray' }}
						label="School Code"
						placeholder="enter your school code"
						onChangeText={(val) => setFormInput({ ...formInput, SchoolCode: val })}
					/>
					<Input
						leftIcon={{ type: 'font-awesome', name: 'lock', size: 20, color: 'gray' }}
						label="Pass Code"
						secureTextEntry={true}
						placeholder="enter pass code"
						onChangeText={(val) => setFormInput({ ...formInput, PassCode: val })}
					/>
					<Input
						leftIcon={{ type: 'font-awesome', name: 'phone', size: 20, color: 'gray' }}
						label="Phone Number"
						placeholder="provide an admin phone number"
						keyboardType="numeric"
						onChangeText={(val) => setFormInput({ ...formInput, AdminPhoneNumber: val })}
					/>
					<Button
						titleStyle={{ fontSize: 20 }}
						onPress={handleLoginClick}
						buttonStyle={{
							backgroundColor: colors.light.primaryColor,
							paddingVertical: 12,
							borderRadius: 10
						}}
						title="Login"
					/>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
};


export default LoginScreen;
