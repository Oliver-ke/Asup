import axios from 'axios';
import { GET_ACADEMIC_SESSION, GET_CLASSES, GET_STATES, GET_LOCAL_GOV, GET_COUNTRIES } from '../constants/endpoint';
import AsyncStorage from '@react-native-community/async-storage';

// SET Registation assets

export const prepareRegAssets = async (schoolId: number, token: string) => {
	// check if item already exist in storage before fire
	// TODO: you need to fetch classes and accademic session as this can change anytime
	const assestStr = await AsyncStorage.getItem('assets');
	if (assestStr) {
		const assets = JSON.parse(assestStr);
		if (Object.keys(assets).length >= 5) {
			return { success: true, assets };
		}
	}
	const config = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	try {
		const { data: accademicSession } = await axios.get(`${GET_ACADEMIC_SESSION}/${schoolId}`, config);
		const { data: classes } = await axios.get(`${GET_CLASSES}/${schoolId}`, config);
		const { data: states } = await axios.get(GET_STATES, config);
		const { data: localGov } = await axios.get(GET_LOCAL_GOV, config);
		const { data: countries } = await axios.get(GET_COUNTRIES, config);
		const payload = { accademicSession, classes, states, localGov, countries };
		await AsyncStorage.setItem('assets', JSON.stringify(payload));
		return { success: true, assets: payload };
	} catch (error) {
		console.log(error);
		return { success: false, error: error.message };
	}
};

// assests shape
/**
 * assets = {
 *   accademicSession: {},
 *   classes: {},
 *   states: {},
 *   localGov: {},
 *   countries: {}
 * }
 */
