import { ImageProps } from "react-native"

export type StudentType = {
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
    ImageData: ImageProps;
    status?: string;
	id?: number
}

export type StudentCardProp = {
    student: StudentType;
}