import { ChangeEvent } from 'react';
import { Props as IReactSelectProps } from 'react-select/src/Select';
import { EFormFieldType } from '@domain/enums';

export interface IFieldProps {
	type: EFormFieldType;
	name: string;
	label?: string;
	pattern?: { [key: string]: RegExp | RegExp[] };
	validateFn?: (value: string) => boolean;
	required?: boolean;
	value?: string;
	onChange?: (e: ChangeEvent<HTMLFormElement>) => void;
}

export interface IFormSubmit {
	[K: string]: string;
}

export interface IFormProps {
	fields?: ISelectProps[];
	submitFn: (data: IFormSubmit) => void;
}

export interface IInputProps extends Omit<IFieldProps, 'pattern' | 'onChange'> {
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ISelectProps extends Omit<IFieldProps, 'value'>, Omit<Partial<IReactSelectProps>, 'name'> {
	templates?: {
		singleValue?: React.FunctionComponent;
		option?: React.FunctionComponent;
	};
}
