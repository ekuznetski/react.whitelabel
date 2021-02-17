import { EFormStatus } from '@domain/enums';
import classNames from 'classnames';
import { FastField, FormikContext, useField } from 'formik';
import React, { memo, useContext } from 'react';
import './Checkbox.scss';

export const Checkbox = memo(function Checkbox({ className = '', children, ...props }: any) {
  const formikProps = useContext(FormikContext);
  const [field, meta] = formikProps ? [] : useField(props);
  const _disabled = props.disabled || formikProps.status === EFormStatus.disabled;

  return (
    <div
      className={classNames(
        'field checkbox',
        !className && 'mb-8',
        className,
        !!field?.value && 'checked',
        !!meta?.error && 'field-error',
        _disabled && 'disabled',
      )}
    >
      <label className="label">
        <FastField type="checkbox" {...props} disabled={_disabled} />
        <div className="checkbox-mark" />
        <div>{children}</div>
      </label>
      {!_disabled && meta?.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
});
