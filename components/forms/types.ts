import { AddStudentScreenNavigationProp } from '../../types';

export type StepHandlerProps = {
	onNextPress?: () => void;
	onPrevPress?: () => void;
	navigation?: AddStudentScreenNavigationProp;
};

export type optionType = {
	label: string;
	value: any;
	stateID?: number;
}

export interface StudentInfoProps extends StepHandlerProps {
	states: optionType[],
	localGov: optionType[],
} 

export interface SchoolInfoProps extends StepHandlerProps {
	classes: optionType[],
	accademicSession: optionType[]
}
