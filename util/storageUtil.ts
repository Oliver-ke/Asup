import axios from 'axios';
import { GET_ACADEMIC_SESSION, GET_CLASSES, GET_STATES, GET_LOCAL_GOV, GET_COUNTRIES } from '../constants/endpoint';
import AsyncStorage from '@react-native-community/async-storage';

// Helper method to manipulate data
//const sanitizeClasses = (classes) => {};

// ---- state types and sanitizer
export type stateType = {
	name: string,
	id: number,
	countryID: number
}

type stateRecordType = {
	records: stateType[]
}

const sanitizeState = (state: stateRecordType) => {
	const newStates = state.records.map(({ name, id, countryID }) => {
		return { label: name, value: id, countryID };
	});
	return newStates;
};

// ----- localGov type and sanitizers
export type localGovType = {
	id: number;
	stateID: number;
	lga: string;
}
type localGovRecordType = {
	records: localGovType[]
}
const sanitizeLocalGov = (localGov:localGovRecordType) => {
	const newLocalGov = localGov.records.map(({id, stateID, lga}) => {
		return {label: lga, value: id, stateID}
	})
	return newLocalGov;
}

// --- class types and sanitizers
export type classType = {
	id: number;
	name: string;
	classGroupCode: string;
	status: boolean
}

const sanitizeClass = (classes: {records: classType[]}) => {
	const newClasses = classes.records.map(({id, name}) => {
		return {label: name, value: id}
	})
	return newClasses
}

// -- accademic session types and sanitizer
export type accdemicSessionType = {
	id: number;
	yearID: number;
	description: string;
}
const sanitizeAccSession = (accSession: {records: accdemicSessionType[]}) => {
	const newAccSession = accSession.records.map(({description, yearID}) => {
		return {label: description, value: yearID}
	})
	return newAccSession
}

// const sanitizeCountry = (countries) => {
// 	// PENDING NOW
// }

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
		// get data
		const { data: accademicSessionRaw } = await axios.get(`${GET_ACADEMIC_SESSION}/${schoolId}`, config);
		const { data: classesRaw } = await axios.get(`${GET_CLASSES}/${schoolId}`, config);
		const { data: statesRaw } = await axios.get(GET_STATES, config);
		const { data: localGovRaw } = await axios.get(GET_LOCAL_GOV, config);
		//const { data: countriesRaw } = await axios.get(GET_COUNTRIES, config);

		// sanitize then
		const accademicSession = sanitizeAccSession(accademicSessionRaw);
		const classes = sanitizeClass(classesRaw);
		const states = sanitizeState(statesRaw);
		const localGov = sanitizeLocalGov(localGovRaw);

		const payload = { accademicSession, classes, states, localGov };
		await AsyncStorage.setItem('assets', JSON.stringify(payload));

		return { success: true, assets: payload };

		// NOTE: countries was remove, country default to Nigeria, with nationalityID=156
	} catch (error) {
		console.log(error, 'this should be an axios error');
		return { success: false, error: error };
	}
};

// assests shape, classes, states, localGov, countries
/**
 * assets = {
 *   accademicSession: {},
 *   classes: {},
 *   states: {},
 *   localGov: {},
 *   countries: {}
 * }
 */
