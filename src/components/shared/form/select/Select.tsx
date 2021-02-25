import { Currencies, EFormStatus, countries } from '@domain/enums';
import { MTradingAccount } from '@domain/models';
import { useCounter, useSetState } from 'ahooks';
import classNames from 'classnames';
import { FieldAttributes, FormikContext, useField } from 'formik';
import React, { memo, useContext, useEffect } from 'react';
import ReactSelect, { MenuProps, components } from 'react-select';
import { FixedSizeList as List } from 'react-window';
import { IconFlag } from '../../iconFlag/IconFlag';
import { Svg } from '../../svg/Svg';
import './Select.scss';

const OPTION_HEIGHT = 36;

function Input(props: any) {
  return <components.Input {...props} autoComplete="disableAutoComplete" />;
}

function NoRender() {
  return null;
}

const MenuList = memo(function MenuList(props: any) {
  const { options, children, maxHeight, getValue } = props;
  const [value] = getValue();
  const initialOffset = Math.max(options.indexOf(value), 0) * OPTION_HEIGHT;
  const _height = Math.min(maxHeight, Math.max((children.length || 0) * OPTION_HEIGHT, OPTION_HEIGHT * 1.5));

  return children.length ? (
    <List
      height={_height}
      itemCount={children.length || 0}
      itemSize={OPTION_HEIGHT}
      initialScrollOffset={initialOffset}
      overscanCount={8}
      width="100%"
    >
      {({ index, style }) => {
        return <div style={style}>{children[index]}</div>;
      }}
    </List>
  ) : (
    <div className="no-options">No Options</div>
  );
});

const Menu = memo(function Menu(props: MenuProps<any, any>) {
  const [current, { inc }] = useCounter(0, { min: 0, max: 1 });
  const { options, children, maxMenuHeight, isMulti, getValue } = props;
  const _styles = {
    height: current
      ? Math.min(
          maxMenuHeight,
          Math.max(
            ((!isMulti ? options.length : options.length - getValue().length) || 0) * OPTION_HEIGHT,
            OPTION_HEIGHT * 1.5,
          ),
        ) + 4 // 4px is vertical padding
      : 0,
    opacity: current ? 1 : 0.4,
  };

  useEffect(() => inc(), []);

  return (
    <components.Menu {...props}>
      <div className={classNames('menu-wrapper', current && 'open')} style={_styles}>
        {children}
      </div>
    </components.Menu>
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
  inline?: boolean;
} & FieldAttributes<any>;

export const Select = memo(function Select({
  preselectedValue = null,
  isSearchable = false,
  placeholder = '',
  className = '',
  label = null,
  inline = false,
  options,
  ...props
}: ISelect) {
  const formikProps = useContext(FormikContext);
  const [field, meta, helpers] = !formikProps ? [] : useField(props as any);
  const [state, setState] = useSetState({
    value: null,
    isFilled: false,
    isFocused: false,
  });
  const _disabled = props.disabled || formikProps.status === EFormStatus.disabled;

  useEffect(() => {
    let _intSelectedValue = preselectedValue;
    if (!_intSelectedValue && (meta?.initialValue || field?.value)) {
      _intSelectedValue = options.find(
        (option: any) => JSON.stringify(option.value) === JSON.stringify(meta?.initialValue || field?.value || null),
      );
    }
    setState({ value: _intSelectedValue, isFilled: !!_intSelectedValue || !!meta?.initialValue });
  }, []);

  useEffect(() => {
    if (field && field.value && field.value != state.value)
      setState({ value: options.find((option: any) => JSON.stringify(option.value) == JSON.stringify(field.value)) });
    else setState({ value: null, isFilled: false });
  }, [field?.value]);

  function onChangeSelect(e: any) {
    let _val = e;
    if (props.isMulti) {
      _val = { value: _val?.map((item: ISelectItem) => item.value) || [] };
    }
    setState({ isFilled: !!_val?.value });
    if (helpers) helpers.setValue(_val?.value);
    if (props.onChange) {
      props.onChange(_val?.value);
    }
  }

  Object.assign(props, {
    components: {
      ...props.components,
      Menu,
      MenuList,
      Input,
    },
  });

  return (
    <div
      className={classNames(
        'field select-wrapper',
        !inline && 'mb-8',
        className,
        meta?.touched && !!meta?.error && 'field-error',
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
        onBlur={() => setState({ isFocused: false, isFilled: !!field?.value })}
        // onMenuOpen={() => setState({ ...state, isFocused: true })}
        // onMenuClose={() => setState({ isFocused: false, isFilled: !!field.value })}
        value={state.value}
        onChange={onChangeSelect}
      />
      {!_disabled && meta && meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
});

export const MultiSelect = memo(({ closeMenuOnSelect = false, ...props }: ISelect & { closeMenuOnSelect: boolean }) => {
  return (
    <Select closeMenuOnSelect={false} isMulti {...props} className={classNames('multi-select', props.className)} />
  );
});

export const PhoneCodeSelect = memo((props: ISelect) => {
  const innerProps = { ...props };
  delete innerProps.options;

  const options = countries.map((el) => ({
    label: (
      <>
        <IconFlag className="mr-1" flag={el.code} />
        <span className="phone">{el.phoneCode}</span> <span className="name">{el.name}</span>
      </>
    ),
    value: el,
  }));

  function customFilter(option: any, searchText: string) {
    return (
      option.data.value.name.toLowerCase().includes(searchText.toLowerCase()) ||
      option.data.value.phoneCode.includes(searchText)
    );
  }

  return (
    <Select
      isSearchable={true}
      options={options}
      filterOption={customFilter}
      {...innerProps}
      className={classNames('phoneCode-select', props.className)}
      components={{ IndicatorSeparator: NoRender }}
    />
  );
});

export const CountrySelect = memo((props: ISelect) => {
  const innerProps = { ...props };
  delete innerProps.options;

  const options = (props.options || countries).map((el: any) => ({
    label: (
      <>
        <IconFlag flag={el.code} className="mr-1" />
        <span className="name">{el.name}</span>
      </>
    ),
    value: el,
  }));

  function customFilter(option: any, searchText: string) {
    return option.data.value.name.toLowerCase().includes(searchText.toLowerCase());
  }

  return (
    <Select
      isSearchable={true}
      options={options}
      filterOption={customFilter}
      {...innerProps}
      className={classNames('country-select', props.className)}
    />
  );
});

export const CurrencySelect = memo((props: any) => {
  const innerProps = { ...props };
  delete innerProps.options;

  const options = Object.keys(props.options ?? Currencies).map((key: any) => ({
    label: (
      <>
        <span className="currency-symbol mr-1">{Currencies[key].symbol}</span>
        {Currencies[key].code}
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
      options={options}
      {...innerProps}
      className={classNames('currency-select', props.className)}
      components={{ Option }}
    />
  );
});

export const TradingAccountsSelect = memo((props: ISelect & { options: MTradingAccount }) => {
  const innerProps = { ...props };
  delete innerProps.options;
  delete innerProps.components;

  const options = props.options.map((account: MTradingAccount) => ({
    label: (
      <div className="trading-account-item" key={account.accountId}>
        <div className="trading-item__platform mr-1">{account.platform.toUpperCase()}</div>
        <div className="trading-item__number">{account.accountId}</div>
        <div className="trading-item__spacer mx-3" />
        <div className="trading-item__balance">
          <Svg href={account.currency.toLowerCase()} className="mr-1" height={12} />
          {account.balance}
        </div>
      </div>
    ),
    value: account,
  }));

  function Option({ children, ...props }: any) {
    const selectedValue = props.selectProps?.value?.value?.accountId;
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
      options={options}
      components={{ Option }}
      {...innerProps}
      className={classNames('trading-account-select', props.className)}
    />
  );
});
