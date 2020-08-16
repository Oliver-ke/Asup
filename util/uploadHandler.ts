import axios from 'axios';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';
import { REGISTER_STUDENT, ADD_STUDENT_PIX } from '../constants/endpoint';

// Async util functions
export const addItemToStorage = async (newItem: object, key: string) => {
	const pack = await AsyncStorage.getItem(key);
	// check if pack exist on async storage
	if (pack) {
		const packItems = JSON.parse(pack);
		const newPack = [ ...packItems, newItem ];
		await AsyncStorage.setItem(key, JSON.stringify(newPack));
		return;
	}
	const newPack = [ newItem ];
	await AsyncStorage.setItem(key, JSON.stringify(newPack));
	return;
};

export const removeItemFromStorage = async (id: string, key: string) => {
	const allItemJson = await AsyncStorage.getItem(key);
	if (allItemJson) {
		const allItem = JSON.parse(allItemJson);
		if (allItem && allItem.length > 0) {
			const newUpdate = allItem.filter((item: any) => item.uploadID !== id);
			await AsyncStorage.setItem(key, JSON.stringify(newUpdate));
			return;
		}
		throw new Error(`Item with id ${id} does not exist`);
	}
	throw new Error(`No item in ${key}`);
};

// ------------ Upload Function -----------------
const axiosConfig = {
	headers: {
		Authorization: ''
	}
};

export const uploadFromAwaiting = async (id: string, token: string) => {
	axiosConfig.headers.Authorization = `Bearer ${token}`;
	try {
		const awaitingUploads = await AsyncStorage.getItem('uploadWaiting');
		if (awaitingUploads) {
			const parsedAwaitingUploads = JSON.parse(awaitingUploads);
			const selectedUploadArr = parsedAwaitingUploads.filter((upload: any) => upload.uploadID === id);
			if (selectedUploadArr.length > 0 && 1) {
				const { uploadID, studentPix, ...mainInfo } = selectedUploadArr[0];
				const { data } = await axios.post(REGISTER_STUDENT, mainInfo, axiosConfig);
				if (data && data.responseMessage === 'Successful') {
					const { studentNo } = data;
					const pixPayload = { ...studentPix, studentNo };
					const { data: pixRes } = await axios.post(ADD_STUDENT_PIX, pixPayload, axiosConfig);
					if (pixRes && pixRes.responseCode === '00') {
						// update
						await removeItemFromStorage(uploadID, 'uploadWaiting');
						await addItemToStorage(selectedUploadArr[0], 'uploadComplete');
						return { result: data, success: true };
					}
					throw new Error('Error adding student picture');
				}
				throw new Error('Error adding student data');
			}
			throw new Error(`No item with uploadID ${id}`);
		}
		throw new Error('No awaiting uploads');
	} catch (error) {
		console.log(error);
		return { error, success: false };
	}
};

export const uploadNow = async (payload: object, studentPix: object, token: string) => {
	const uploadID = uuid();
	axiosConfig.headers.Authorization = `Bearer ${token}`;
	try {
		// save item to awaiting uploads first
		await addItemToStorage({ ...payload, uploadID, studentPix }, 'uploadWaiting');
		// post student data
		const { data } = await axios.post(REGISTER_STUDENT, payload, axiosConfig);
		if (data && data.responseMessage === 'Successful') {
			const { studentNo } = data;
			const pixPayload = { ...studentPix, studentNo };
			// post pix
			const { data: pixRes } = await axios.post(ADD_STUDENT_PIX, pixPayload, axiosConfig);
			if (pixRes && pixRes.responseCode === '00') {
				// update
				await removeItemFromStorage(uploadID, 'uploadWaiting');
				await addItemToStorage({ ...payload, uploadID, studentPix }, 'uploadComplete');
				return { result: data, success: true };
			}
			throw new Error('Picture Upload Failed');
		}
		throw new Error('Student Registration Failed');
	} catch (error) {
		console.log(error);
		return { error, success: false };
	}
};

/**
 * object shape
 * uploadWaiting: [
 *   {
 *      uploadID: <item-id>
 *      ...
 *      studentPix: {
 *          ...
 *      }
 *   }
 * ]
 * uploadComplete: [
 *   {
 *      uploadID: <item-id>
 *      ...
 *      studentPix: {
 *          ...
 *      }
 *   }
 * ]
 */
