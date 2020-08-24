import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { nanoid } from 'nanoid/async/index';
import AsyncStorage from '@react-native-community/async-storage';
import { REGISTER_STUDENT, ADD_STUDENT_PIX } from '../constants/endpoint';

// Async util functions
export const clearStorage = async () => {
	await AsyncStorage.multiRemove([ 'uploadWaiting', 'uploadComplete' ]);
	return console.log('Items cleared');
};

export const searchStorage = async (query: string) => {
	// get all items in storage
	try {
		const awaitingJson = await AsyncStorage.getItem('uploadWaiting') || '';
		const uploadedJson = await AsyncStorage.getItem('uploadComplete') || '';
		if(awaitingJson && uploadedJson){
			const awaiting = JSON.parse(awaitingJson) || [];
			const uploaded = JSON.parse(uploadedJson) || [];
			const payload = [...awaiting, ...uploaded]; 
			const searchStr = query.toLowerCase();
			const searchResult = payload.filter((student) => {
				const name = `${student.FirstName} ${student.LastName}`.toLowerCase();
				return name.includes(searchStr);
			});
			return searchResult;
		}
		return [];
	} catch (error) {
		console.log(error);
		return {success: false, error}
	}
}

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

export const getItemsFromStorage = async (key: string) => {
	const itemsJson = await AsyncStorage.getItem(key);
	if (itemsJson) {
		return JSON.parse(itemsJson);
	}
	return [];
};

export const getItemFromStorage = async (uploadID: string, key: string) => {
	const itemsJson = await AsyncStorage.getItem(key);
	if (itemsJson) {
		const allItems = JSON.parse(itemsJson);
		const choosenItem = allItems.filter((item: any) => item.uploadID === uploadID)[0];
		return choosenItem;
	}
	return null;
};

// ---------- Save for Upload later

export const saveForLater = async (payload: object, studentPix: object) => {
	const uploadID = await nanoid();
	try {
		await addItemToStorage({ ...payload, uploadID, studentPix, uploaded: false }, 'uploadWaiting');
	} catch (error) {
		console.log('Error saving upload for later');
	}
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
				console.log(selectedUploadArr[0]);
				const { uploadID, studentPix, ...mainInfo } = selectedUploadArr[0];
				const { data } = await axios.post(REGISTER_STUDENT, mainInfo, axiosConfig);
				if (data && data.responseMessage === 'Successful') {
					const { studentNo: StudentNo } = data;
					const { ImageData } = studentPix;
					// read the uri into base64 encoding
					const imgBase64 = await FileSystem.readAsStringAsync(ImageData, {
						encoding: FileSystem.EncodingType.Base64
					});
					const pixPayload = { ...studentPix, StudentNo, ImageData: imgBase64 };
					const { data: pixRes } = await axios.post(ADD_STUDENT_PIX, pixPayload, axiosConfig);
					console.log(pixRes);
					if (pixRes && pixRes.responseCode === '00') {
						// update
						await removeItemFromStorage(uploadID, 'uploadWaiting');
						await addItemToStorage({ ...selectedUploadArr[0], uploaded: true }, 'uploadComplete');
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

export const uploadNow = async (payload: object, studentPix: any, token: string) => {
	const uploadID = await nanoid();
	axiosConfig.headers.Authorization = `Bearer ${token}`;
	try {
		// save item to awaiting uploads first
		await addItemToStorage({ ...payload, uploadID, uploaded: false, studentPix }, 'uploadWaiting');
		const { data } = await axios.post(REGISTER_STUDENT, payload, axiosConfig);
		if (data && data.responseMessage === 'Successful') {
			const { studentNo: StudentNo } = data;
			const { ImageData } = studentPix;

			// read the uri into base64 encoding
			const imgBase64 = await FileSystem.readAsStringAsync(ImageData, {
				encoding: FileSystem.EncodingType.Base64
			});
			const pixPayload = { ...studentPix, StudentNo, ImageData: imgBase64 };
			// post pix
			const { data: pixRes } = await axios.post(ADD_STUDENT_PIX, pixPayload, axiosConfig);
			if (pixRes && pixRes.responseCode === '00') {
				// update
				await removeItemFromStorage(uploadID, 'uploadWaiting');
				await addItemToStorage({ ...payload, uploadID, studentPix, uploaded: true }, 'uploadComplete');
				return { result: data, success: true };
			}
			throw new Error('Picture Upload Failed');
		}
		throw new Error('Student Registration Failed');
	} catch (error) {
		await removeItemFromStorage(uploadID, 'uploadWaiting');
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
