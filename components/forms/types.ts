import { AddStudentScreenNavigationProp } from '../../types';

export type StepHandlerProps = {
	onNextPress?: () => void;
	onPrevPress?: () => void;
	navigation?: AddStudentScreenNavigationProp;
};

export interface StudentInfoProps extends StepHandlerProps {
	states: object,
	localGov: object,
	countries: object
} 

export interface SchoolInfoProps extends StepHandlerProps {
	classes: object
}
