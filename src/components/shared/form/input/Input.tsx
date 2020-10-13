import React, { memo, useState, useEffect, forwardRef } from 'react';
import './Input.scss';
import { useField, useFormikContext } from 'formik';
import classNames from 'classnames';
import { EFormStatus } from '@domain/enums';
import { Loader } from '@components/shared';
import { useCombinedRef } from '@utils/hooks';

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
      if ((!!regex && regex.test(val)) || val === '' || !regex) {
        helpers.setValue(val);
      }
      onChange?.(e);
    }

    return (
      <div
        className={classNames(
          'field input mb-8',
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
          {...field}
          {...inputProps}
          type={type}
          disabled={_disabled}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          ref={ref}
        />
        {(meta.touched || forceShowError) && !_disabled && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
        {regex && onChange && (
          <div style={{ color: 'red' }}>
            you can't use regex and onChange in one input, pls move regex logic to your onChangeHandler
          </div>
        )}
      </div>
    );
  }),
);
