import { createContext } from 'react';

export const StudentContext = createContext<any | undefined>(undefined);
export const StudentProvider = StudentContext.Provider;
export const Consumer = StudentContext.Consumer;

export let initialState = {
	studentInfo: {},
	parentInfo: {},
	schoolInfo: {},
	uploaded: false
};

export const reducer = (state: any, action: any) => {
	switch (action.type) {
		case 'SET_STUDENT_INFO':
			return {
				...state,
				studentInfo: { ...action.payload }
			};
		case 'SET_PARENT_INFO':
			return {
				...state,
				parentInfo: { ...action.payload }
			};
		case 'SET_SCHOOL_INFO':
			return {
				...state,
				schoolInfo: { ...action.payload }
			};
		default:
			return state;
	}
};
