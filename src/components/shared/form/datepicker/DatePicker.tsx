import { EFormStatus } from '@domain/enums';
import { useCombinedRef } from '@utils/hooks';
import { useResponsive, useSetState } from 'ahooks';
import classNames from 'classnames';
import { FormikContext, useField } from 'formik';
import moment from 'moment';
import React, { ReactNode, forwardRef, memo, useContext, useEffect } from 'react';
import DayPicker, { DateUtils, DayModifiers } from 'react-day-picker';
import { DropDown } from '../../dropdown/Dropdown';
import { Svg } from '../../svg/Svg';
import './DatePicker.scss';

interface IDatePicker {
  [key: string]: any;
  className?: string;
  label?: string;
  name: string;
  forceShowError?: boolean;
  range?: boolean;
  children?: ReactNode;
}

export const DatePicker = memo(
  forwardRef<any, IDatePicker>(function DatePicker(
    { className = '', label = null, forceShowError = null, range = false, ...props },
    ref,
  ) {
    const formikProps = useContext(FormikContext);
    const [field, meta, helpers] = !formikProps ? [] : useField(props);
    const [isOpen, setOpen] = React.useState(false);
    const _ref = useCombinedRef(ref);
    const responsive = useResponsive();
    const [state, setState] = useSetState<any>({
      isFocused: false,
      from: undefined,
      to: undefined,
      dropDownWidth: 245, // the size of a single datepicker
    });
    const _disabled = props.disabled || formikProps.status === EFormStatus.disabled;

    useEffect(() => {
      setState({ isFilled: !!state.to || !!state.from });
    }, [state.to, state.from]);

    useEffect(() => {
      if (!isOpen) {
        setState({ isFocused: false });
        setOpen(false);
      }
    }, [isOpen]);

    useEffect(() => {
      if (_ref.current && range && state.dropDownWidth != _ref.current.offsetWidth) {
        setState({ dropDownWidth: _ref.current.offsetWidth });
      }
    }, [_ref, responsive]);

    function handleDayClick(day: Date, { selected }: DayModifiers) {
      const _range = range ? DateUtils.addDayToRange(day, state) : { from: selected ? undefined : day, to: undefined };
      const formattedRange = range ? [moment(_range.from), moment(_range.to)] : [moment(_range.from)];

      if (helpers) helpers.setValue(formattedRange);

      if ((!range && _range.from) || state.to !== _range.to) {
        setOpen(false);
      }

      setState({ ..._range });
    }

    function onFocusHandler(e: any) {
      if (!state.isFocused) {
        setState({ isFocused: true });
        setOpen(true);
      }
    }

    function _value() {
      var val = '';
      if (state.from) val += moment(state.from).format('Do, MMM YY') + (range ? ' - ' : '');
      if (state.to) val += moment(state.to).format('Do, MMM YY');
      return val;
    }

    return (
      <div
        className={classNames(
          'field datepicker mb-8',
          !!label && 'with-label',
          className,
          meta?.touched && meta?.error && 'field-error',
          state.isFocused && 'focused',
          state.isFilled && 'filled',
          _disabled && 'disabled',
        )}
        ref={_ref}
      >
        {!!label && (
          <label className="label" htmlFor={props.name}>
            {label}
          </label>
        )}
        <Svg href="calendar" height={28} />
        <input
          value={_value()}
          onFocus={onFocusHandler}
          onClick={onFocusHandler}
          readOnly
          onChange={(e) => e.preventDefault()}
        />
        <DropDown
          className={classNames('datepicker', state.isFocused && 'focused')}
          parentRef={_ref}
          isOpen={isOpen}
          isOpenDispatcher={setOpen}
          width={range ? state.dropDownWidth : 255}
          noArrow={true}
          alignToParentLeft={false}
        >
          <DayPicker
            className={range ? 'range' : ''}
            numberOfMonths={range && responsive.sm ? 2 : 1}
            selectedDays={range ? [state.from, { from: state.from, to: state.to }] : state.from}
            modifiers={range ? { start: state.from, end: state.to } : { selectedDay: state.from }}
            onDayClick={handleDayClick}
          />
        </DropDown>
        {meta?.touched && meta?.error ? <div className="error">{meta.error}</div> : null}
      </div>
    );
  }),
);
