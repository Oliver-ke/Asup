import { ImageProps } from "react-native"

export type StudentType = {
	uploadID: string;
	StudentNo: string;
	SchoolCode: string;
	LastName: string;
	FirstName: string;
	OtherName: string;
	Gender: string;
	DateOfBirth: string;
	NationalityID: number;
	StateOfOriginID: number;
	LGAOfOriginID: number
	AdmissionDate: string;
	ClassAdmittedID: number
	TermAdmitted: number;
	YearOfAdmission: number;
	CurrentClassID: number;
	GuardianFirstName: string;
	GuardianLastName: string;
	GuardianOtherName: string;
	GuardianGender: string;
	GuardianPhoneNo: string;
	GuardianEmailAddress: string;
	GuardianRelationship: string;
	GuardianAddress: string;
	uploaded: boolean;
    studentPix: {
		SchoolCode: string;
		StudentNo: string;
		ImageData: string
	}
}

export type StudentCardProp = {
    student: StudentType;
}