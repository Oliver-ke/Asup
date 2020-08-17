import { createContext } from 'react';

export const StudentContext = createContext<any | undefined>(undefined);
export const StudentProvider = StudentContext.Provider;
export const Consumer = StudentContext.Consumer;

export const initialState = {
	studentInfo: {
		StudentNo: "XXXXXXXXXX",
		SchoolCode: '',
		LastName: '',
		FirstName: '',
		OtherName: '',
		Gender: 'Male',
		DateOfBirth: new Date(),
		NationalityID: 156,
		StateOfOriginID: '',
		LGAOfOriginID: ''
	},
	parentInfo: {
		GuardianFirstName: '',
		GuardianLastName: '',
		GuardianOtherName: '',
		GuardianGender: 'Male',
		GuardianPhoneNo: '',
		GuardianEmailAddress: '',
		GuardianRelationship: 'Uncle',
		GuardianAddress: ''
	},
	schoolInfo: {
		AdmissionDate: new Date(),
		ClassAdmittedID: 1,
		TermAdmitted: 1,
		YearOfAdmission: '',
		CurrentClassID: 1
	},
	studentPix: {
		SchoolCode: '',
		StudentNo: '',
		ImageData: ''
	},
	updateData: false
};

export const studentTypes = {
	SET_STUDENT_INFO: 'SET_STUDENT_INFO',
	SET_PARENT_INFO: 'SET_PARENT_INFO',
	SET_SCHOOL_INFO: 'SET_SCHOOL_INFO',
	SET_STUDENT_PIX: 'SET_STUDENT_PIX',
	RESET_DATA: 'RESET_DATA'
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
		case 'SET_STUDENT_PIX':
			return {
				...state,
				studentPix: { ...action.payload }
			};
		case 'RESET_DATA':
			return initialState;
		default:
			return state;
	}
};
