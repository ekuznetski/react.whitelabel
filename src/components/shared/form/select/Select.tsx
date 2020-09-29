import { IconFlag, Svg } from '@components/shared';
import { countries, Currencies, EFormStatus } from '@domain/enums';
import { MTradingAccount } from '@domain/models';
import classNames from 'classnames';
import { FieldAttributes, useField, useFormikContext } from 'formik';
import React, { memo, useState } from 'react';
import ReactSelect, { components } from 'react-select';
import { Spring } from 'react-spring/renderprops';
import { animated } from 'react-spring';
import BezierEasing from 'bezier-easing';
import { FixedSizeList as List } from 'react-window';
import './Select.scss';

function Input(props: any) {
  return <components.Input {...props} autoComplete="disableAutoComplete" />;
}

function IndicatorSeparator() {
  return null;
}

const MenuList = memo(function MenuList(props: any) {
  const OPTION_HEIGHT = 36;
  const { options, children, maxHeight, getValue } = props;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * OPTION_HEIGHT;
  const _height = Math.min(maxHeight, children.length * OPTION_HEIGHT) ?? 100;
  const easeAnimation = BezierEasing(0.25, 0.1, 0.25, 1.0);

  return (
    <Spring
      config={{ duration: 300, easing: easeAnimation }}
      from={{ height: 0, opacity: 0.4 }}
      to={{ height: _height, opacity: 1 }}
    >
      {(animatedProps) => (
        <animated.div className="menu-wrapper" style={animatedProps}>
          <List
            height={_height}
            itemCount={children.length}
            itemSize={OPTION_HEIGHT}
            initialScrollOffset={initialOffset}
            width="100%"
          >
            {({ index, style }) => {
              return <div style={style}>{children[index]}</div>;
            }}
          </List>
        </animated.div>
      )}
    </Spring>
  );
});

export interface ISelectItem {
  [k: string]: any;
  label: React.ReactNode;
  value: React.ReactNode;
}

export type ISelect = {
  [k: string]: any;
  preselectedValue?: ISelectItem | null | undefined;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
  label?: string | null | undefined;
  options: ISelectItem[];
} & FieldAttributes<any>;

export const Select = memo(function Select({
  preselectedValue = null,
  isSearchable = false,
  placeholder = '',
  className = '',
  label = null,
  options,
  ...props
}: ISelect) {
  const { status: FormStatus } = useFormikContext();
  const [field, meta, helpers] = useField(props as any);

  if (!preselectedValue && (meta.initialValue || field.value)) {
    preselectedValue = options.find((el: any) => el.value === meta.initialValue ?? field.value) || null;
  }

  const [selectedValue, setSelectedValue] = useState(preselectedValue ?? null);
  const [state, setState] = useState({
    isFilled: !!meta.initialValue,
    isFocused: false,
  });
  const _disabled = props.isDisabled || FormStatus === EFormStatus.disabled;

  function onChangeSelect(e: any) {
    console.log(e);
    setSelectedValue(e);
    helpers.setValue(e.value);
    if (props.onChange) {
      props.onChange(e.value);
    }
  }

  Object.assign(props, {
    components: {
      ...props.components,
      MenuList,
      IndicatorSeparator,
      Input,
    },
  });

  return (
    <div
      className={classNames(
        'field select-wrapper mb-8',
        className,
        meta.touched && !!meta.error && 'field-error',
        !!label && 'with-label',
        state.isFocused && 'focused',
        state.isFilled && 'filled',
        _disabled && 'disabled',
      )}
    >
      {!!label && <label className="label">{label}</label>}
      <ReactSelect
        {...field}
        {...props}
        isDisabled={_disabled}
        placeholder={placeholder}
        options={options}
        isSearchable={isSearchable}
        onFocus={(e: any) => setState((state) => ({ ...state, isFocused: true }))}
        onBlur={(e: any) => setState({ isFocused: false, isFilled: !!field.value })}
        value={selectedValue}
        onChange={onChangeSelect}
      />
      {!_disabled && meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
});

export const MultiSelect = memo(({ closeMenuOnSelect = false, ...props }: ISelect & { closeMenuOnSelect: boolean }) => {
  const innerProps = { ...props };
  delete innerProps.options;

  const options = countries.map((el) => ({
    label: (
      <>
        <IconFlag flag={el.code} /> <span className="phone">{el.phoneCode}</span>{' '}
        <span className="name">{el.name}</span>
      </>
    ),
    value: el.phoneCode.replace('+', ''),
    code: el.code,
  }));
  const preselectedValue = props.preselectedValue ? options.find((el) => el.code === props.preselectedValue) : null;

  return (
    <Select
      className={classNames('phoneCode-select', props.className)}
      closeMenuOnSelect={false}
      isMulti
      name={name}
      options={options}
      {...innerProps}
      preselectedValue={preselectedValue}
    />
  );
});

export const PhoneCodeSelect = memo((props: ISelect & { preselectedValue: string }) => {
  const innerProps = { ...props };
  delete innerProps.options;

  const options = countries.map((el) => ({
    label: (
      <>
        <IconFlag flag={el.code} /> <span className="phone">{el.phoneCode}</span>{' '}
        <span className="name">{el.name}</span>
      </>
    ),
    value: el.phoneCode.replace('+', ''),
    code: el.code,
  }));
  const preselectedValue = props.preselectedValue ? options.find((el) => el.code === props.preselectedValue) : null;

  return (
    <Select
      isSearchable={true}
      className={classNames('phoneCode-select', props.className)}
      name={name}
      options={options}
      {...innerProps}
      preselectedValue={preselectedValue}
    />
  );
});

export const CountrySelect = memo((props: ISelect) => {
  const innerProps = { ...props };
  delete innerProps.options;

  const options = countries.map((el) => ({
    label: (
      <>
        <IconFlag flag={el.code} /> <span className="name">{el.name}</span>
      </>
    ),
    value: el.code,
    name: el.name,
  }));

  function customFilter(option: any, searchText: string) {
    return option.data.name.toLowerCase().includes(searchText.toLowerCase());
  }

  return (
    <Select
      isSearchable={true}
      className={classNames('country-select', props.className)}
      name={name}
      options={options}
      filterOption={customFilter}
      {...innerProps}
    />
  );
});

export const CurrencySelect = memo((props: any) => {
  const name = props.name;
  const options = Object.keys(props.options ?? Currencies).map((key: any) => ({
    label: (
      <>
        <span className="currency-symbol">{Currencies[key].symbol}</span> {Currencies[key].code}
      </>
    ),
    value: Currencies[key].code,
  }));

  function Option({ children, ...props }: any) {
    const selectedValue = props.selectProps?.value?.value;
    const currentOptionValue = props.data.value;
    const isSelected = selectedValue === currentOptionValue;
    return (
      <components.Option {...props} className={isSelected ? 'selected' : ''}>
        {children}
      </components.Option>
    );
  }

  return (
    <Select
      className={classNames('currency-select', props.className)}
      name={name}
      components={{ Option }}
      options={options}
      {...props}
    />
  );
});

export const TradingAccountsSelect = memo((props: ISelect & { options: MTradingAccount }) => {
  const innerProps = { ...props };
  delete innerProps.options;

  const options = props.options.map((account: MTradingAccount) => ({
    label: (
      <div className="trading-account-option" key={account.accountId}>
        <div className="trading-option__platform mr-1">{account.platformName}</div>
        <div className="trading-option__number">{account.accountId}</div>
        <div className="trading-option__spacer mx-3" />
        <div className="trading-option__balance">
          <Svg href={account.currency.toLowerCase() + '.svg'} className="mr-1" height={12} />
          {account.balance}
        </div>
      </div>
    ),
    value: account,
  }));

  function Option({ children, ...props }: any) {
    const selectedValue = props.selectProps?.value?.value.accountId;
    const currentOptionValue = props.data.value.accountId;
    const isSelected = selectedValue === currentOptionValue;
    return (
      <components.Option {...props} className={isSelected ? 'selected' : ''}>
        {children}
      </components.Option>
    );
  }

  return (
    <Select
      className={classNames('trading-account-select', props.className)}
      name={name}
      options={options}
      components={{ Option }}
      {...innerProps}
    />
  );
});
