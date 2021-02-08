import { EFormStatus } from '@domain/enums';
import { useCombinedRef } from '@utils/hooks';
import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';
import React, { forwardRef, memo, useEffect, useState } from 'react';
import { Loader } from '../../loader/Loader';
import './Input.scss';

export const Input = memo(
  forwardRef<HTMLInputElement, any>(function Input(
    {
      className = '',
      type = 'text',
      label = null,
      onFocus = null,
      onBlur = null,
      onChange = null,
      forceShowError = null,
      regex = null,
      isLoading = null,
      inline = false,
      ...props
    },
    _ref,
  ) {
    const { status: FormStatus } = useFormikContext();
    const [field, meta, helpers] = useField(props);
    const ref = useCombinedRef(_ref);
    const [state, setState] = useState({
      isFocused: false,
      isFilled: !!meta.initialValue,
    });
    const _disabled = props.disabled || FormStatus === EFormStatus.disabled;
    const inputProps = { ...props };
    delete inputProps.isLoading;

    useEffect(() => {
      if (field && !state.isFilled) setState({ ...state, isFilled: !!field.value || !!field.value?.length });
      if (!field?.value && !state.isFocused) setState({ ...state, isFilled: false });
    }, [field?.value]);

    function onFocusHandler(e: any) {
      setState({ ...state, isFocused: true });
      onFocus?.(e, state);
    }

    function onBlurHandler(e: any) {
      setState({
        ...state,
        isFocused: false,
        isFilled: !!e.target.value,
      });
      onBlur?.(e, state);
    }

    function onChangeHandler(e: any) {
      const val = e.target.value;
      if ((!!regex && regex.test(val.toString())) || val.toString() === '' || !regex) {
        helpers.setValue(val);
      }
      onChange?.(e);
    }

    function onAnimationStartHandler(e: any) {
      setState({ ...state, isFilled: e.animationName === 'onAutoFillStart' });
    }

    return (
      <div
        className={classNames(
          'field input',
          !inline && 'mb-8',
          !!label && 'with-label',
          meta.touched && meta.error && 'field-error',
          state.isFocused && 'focused',
          state.isFilled && 'filled',
          _disabled && 'disabled',
          className,
        )}
      >
        {!!label && (
          <label className="label" htmlFor={props.name}>
            {label}
          </label>
        )}
        {isLoading && <Loader className="input-loader" />}
        <input
          inputMode={type === 'number' ? 'tel' : type}
          {...field}
          {...inputProps}
          type={type === 'number' ? 'text' : type}
          disabled={_disabled}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          onAnimationStart={onAnimationStartHandler}
          ref={ref}
        />
        {(meta.touched || forceShowError) && !_disabled && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  }),
);
