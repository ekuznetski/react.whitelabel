import { EFormStatus } from '@domain/enums';
import { AnyFunction } from '@domain/interfaces';
import classNames from 'classnames';
import { FastField, FastFieldAttributes, useField, useFormikContext } from 'formik';
import React, { memo } from 'react';
import { Row } from 'react-bootstrap';
import './Radio.scss';

export interface IRadioItem {
  label: React.ReactNode;
  value: string;
  className?: string;
}
export type IRadio = FastFieldAttributes<{
  optionClassName?: string;
  onChange?: AnyFunction;
  onClick?: AnyFunction;
  className?: string;
  showMarkDot?: boolean;
  options: IRadioItem[];
}>;

export const Radio = memo(function Radio({
  optionClassName = 'col',
  className = '',
  options,
  showMarkDot = true,
  ...props
}: IRadio) {
  const { status: FormStatus } = useFormikContext();
  const [field, meta, helpers] = useField(props);
  const _disabled = props.disabled || FormStatus === EFormStatus.disabled;

  function onChangeHandler(e: any) {
    helpers.setValue(e.target.value);
    props.onChange?.(e);
  }

  function onClickHandler(e: any) {
    helpers.setValue(e.target.value);
    props.onClick?.(e);
  }
  return (
    <Row
      className={classNames(
        'radio-wrapper',
        className,
        meta.touched && meta.error && 'field-error',
        _disabled && 'disabled',
      )}
    >
      {options.map((el: IRadioItem, idx) => (
        <div
          className={classNames(
            (options.length % 2 == 0 ? idx < options.length - 2 : idx < options.length - 1) && 'mb-8',
            optionClassName,
            el.className,
          )}
          key={el.value}
        >
          <label
            className={classNames(
              'radio-label',
              !React.isValidElement(el.label) && 'pl-7 pr-7 py-3',
              showMarkDot && 'pl-sm-13',
              field.value === el.value.toString() && 'selected',
            )}
          >
            {showMarkDot && <span className="mark d-none d-sm-block" />}
            <FastField
              className="d-none"
              type="radio"
              name={props.name}
              value={el.value}
              disabled={_disabled}
              onClick={onClickHandler}
              onChange={onChangeHandler}
            />
            {el.label}
          </label>
        </div>
      ))}
      {!_disabled && meta.touched && meta.error ? <div className="col-12 error">{meta.error}</div> : null}
    </Row>
  );
});
