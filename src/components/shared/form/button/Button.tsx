import { EFormStatus } from '@domain/enums';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import React, { forwardRef, memo } from 'react';
import './Button.scss';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	checkFormValidity?: boolean;
}

export const Button = memo(
	forwardRef<HTMLButtonElement, IButton>(function Button({ className = '', checkFormValidity = false, ...props }, ref) {
		const formikProps = useFormikContext();
		const _disabled =
			props.disabled ||
			(formikProps && (formikProps?.status === EFormStatus.disabled || (checkFormValidity && !formikProps?.isValid)));
		const _buttonProps = { ...props };
		delete _buttonProps.children;

		return (
			<button
				className={classNames('common-button', className, _disabled && 'disabled')}
				{..._buttonProps}
				disabled={_disabled}
				ref={ref}
			>
				{props.children}
			</button>
		);
	}),
);
