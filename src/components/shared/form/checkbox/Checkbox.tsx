import { EFormStatus } from '@domain/enums';
import classNames from 'classnames';
import { FastField, useField, useFormikContext } from 'formik';
import React, { memo } from 'react';
import './Checkbox.scss';

export const Checkbox = memo(function Checkbox({ className = '', children, ...props }: any) {
	const { status: FormStatus } = useFormikContext();
	const [field, meta] = useField(props);
	const _disabled = props.disabled || FormStatus === EFormStatus.disabled;

	return (
		<div
			className={classNames(
				'field checkbox mb-8',
				className,
				!!field.value && 'checked',
				!!meta.error && 'field-error',
				_disabled && 'disabled',
			)}
		>
			<label className="label">
				<FastField type="checkbox" {...props} disabled={_disabled} />
				<div className="checkbox-mark" />
				<div>{children}</div>
			</label>
			{!_disabled && meta.error ? <div className="error">{meta.error}</div> : null}
		</div>
	);
});
