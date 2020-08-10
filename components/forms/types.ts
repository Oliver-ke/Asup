import { AddStudentScreenNavigationProp } from '../../types';

export type StepHandlerProps = {
	onNextPress?: () => void;
	onPrevPress?: () => void;
	navigation?: AddStudentScreenNavigationProp;
};
