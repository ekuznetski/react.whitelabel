import { EFormStatus } from '@domain/enums';
import classNames from 'classnames';
import { FastField, FastFieldAttributes, useField, useFormikContext } from 'formik';
import React, { memo } from 'react';
import { Row } from 'react-bootstrap';
import './Radio.scss';

export interface IRadioItem {
  label: React.ReactNode;
  value: string;
}
export type IRadio = FastFieldAttributes<{
  colClassName?: string;
  className?: string;
  options: IRadioItem[];
}>;

export const Radio = memo(function ({ colClassName = 'col', className = '', options, ...props }: IRadio) {
  const { status: FormStatus } = useFormikContext();
  const [field, meta] = useField(props);
  const _disabled = props.disabled || FormStatus === EFormStatus.disabled;

  return (
    <Row
      className={classNames(
        className,
        'radio-wrapper',
        meta.touched && meta.error && 'field-error',
        _disabled && 'disabled',
      )}
    >
      {options.map((el: IRadioItem) => (
        <div className={colClassName} key={el.value}>
          <label className={classNames('radio-label', field.value === el.value.toString() && 'selected')}>
            {!React.isValidElement(el.label) && <span className="mark d-none d-sm-block" />}
            <FastField className="d-none" type="radio" name={props.name} value={el.value} disabled={_disabled} />
            {el.label}
          </label>
        </div>
      ))}
      {!_disabled && meta.touched && meta.error ? <div className="col-12 error">{meta.error}</div> : null}
    </Row>
  );
});
