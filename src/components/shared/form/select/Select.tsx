import { IconFlag, Svg } from '@components/shared';
import { countries, Currencies, EFormStatus } from '@domain/enums';
import { MTradingAccount } from '@domain/models';
import classNames from 'classnames';
import { FieldAttributes, useField, useFormikContext } from 'formik';
import React, { forwardRef, memo, useState } from 'react';
import ReactSelect, { components } from 'react-select';
import { useSpring, animated } from 'react-spring';
import BezierEasing from 'bezier-easing';
import { FixedSizeList as List } from 'react-window';
import './Select.scss';

function Input(props: any) {
  return <components.Input {...props} autoComplete="disableAutoComplete" />;
}

function NoRender() {
  return null;
}

const MenuList = memo(function MenuList(props: any) {
  const OPTION_HEIGHT = 36;
  const { options, children, maxHeight, getValue } = props;
  const [value] = getValue();
  const initialOffset = Math.max(options.indexOf(value), 0) * OPTION_HEIGHT;
  const _height = Math.min(maxHeight, Math.max((children.length || 0) * OPTION_HEIGHT, OPTION_HEIGHT * 1.5)) ?? 100;
  const easeAnimation = BezierEasing(0.25, 0.1, 0.25, 1.0);
  const animatedProps: any = useSpring({
    config: { duration: 300, easing: easeAnimation },
    from: { height: 0, opacity: 0.4 },
    to: { height: _height, opacity: 1 },
  });

  return (
    <animated.div className="menu-wrapper" style={animatedProps}>
      {children.length ? (
        <List
          height={_height}
          itemCount={children.length || 0}
          itemSize={OPTION_HEIGHT}
          initialScrollOffset={initialOffset}
          width="100%"
        >
          {({ index, style }) => {
            return <div style={style}>{children[index]}</div>;
          }}
        </List>
      ) : (
        <div className="no-options">No Options</div>
      )}
    </animated.div>
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
    let _val = e;
    if (props.isMulti) {
      _val = { value: _val?.map((item: ISelectItem) => item.value) || [] };
    }

    setSelectedValue(e);
    helpers.setValue(_val?.value);
    if (props.onChange) {
      props.onChange(_val?.value);
    }
  }

  Object.assign(props, {
    components: {
      ...props.components,
      MenuList,
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
        // defaultMenuIsOpen={true}
        onFocus={() => setState({ ...state, isFocused: true })}
        onBlur={() => setState({ isFocused: false, isFilled: !!field.value })}
        // onMenuOpen={() => setState({ ...state, isFocused: true })}
        // onMenuClose={() => setState({ isFocused: false, isFilled: !!field.value })}
        value={selectedValue}
        onChange={onChangeSelect}
      />
      {!_disabled && meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
});

export const MultiSelect = memo(({ closeMenuOnSelect = false, ...props }: ISelect & { closeMenuOnSelect: boolean }) => {
  return (
    <Select
      className={classNames('multi-select', props.className)}
      closeMenuOnSelect={false}
      isMulti
      name={name}
      {...props}
    />
  );
});

export const PhoneCodeSelect = memo((props: ISelect & { preselectedValue: string }) => {
  const innerProps = { ...props };
  delete innerProps.options;

  const options = countries.map((el) => ({
    label: (
      <>
        <IconFlag className="mr-1" flag={el.code} />
        <span className="phone">{el.phoneCode}</span> <span className="name">{el.name}</span>
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
      components={{ IndicatorSeparator: NoRender }}
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
      <div className="trading-account-item" key={account.accountId}>
        <div className="trading-item__platform mr-1">{account.platformName}</div>
        <div className="trading-item__number">{account.accountId}</div>
        <div className="trading-item__spacer mx-3" />
        <div className="trading-item__balance">
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
