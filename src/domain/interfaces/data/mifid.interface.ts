import { EResponseStatus } from '@domain/enums';

export interface IMifidResponse {
	response: {
		status: EResponseStatus;
		message: string;
		messageCode: number;
		data?: IMifidData;
	};
}

export interface IMifidData {
	priorities: {
		priority1: IMifidField | priorityEnum.concat;
		priority2?: IMifidField | priorityEnum.concat;
		priority3?: IMifidField | priorityEnum.concat;
	};
	CONCAT: IConcat[];
}

export interface IConcat {
	label: string;
	field: string;
	value: string;
}

export interface IMifidField {
	label: string;
	field: string;
	optional?: boolean;
	value?: number | string | boolean;
}

export enum priorityEnum {
	concat = 'CONCAT',
}
