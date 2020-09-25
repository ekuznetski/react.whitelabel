import React, { useState } from 'react';
import './TabContentChooseAmount.scss';
import { ECurrency, ECurrencySymbol } from '@domain/enums';
import * as Yup from 'yup';
import { Form, Formik, useFormikContext } from 'formik';
import { Button, Input, Radio, TradingAccountsSelect } from '@components/shared';
import { useSelector } from 'react-redux';
import { IStore } from '@store';
import { MTradingAccount } from '@domain/models';

enum EFields {
  'account' = 'account',
  'amount' = 'amount',
  'customAmount' = 'customAmount',
}

export function TabContentChooseAmount({ submitFn }: { submitFn: (data: any) => void }) {
  const ref = React.createRef<HTMLInputElement>();
  const [isCustomAmountFocused, setIsCustomAmountFocused] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<MTradingAccount | null>(null);

  const { tradingAccounts } = useSelector<IStore, { tradingAccounts: MTradingAccount[] }>((state) => ({
    tradingAccounts: state.data.tradingData.accounts,
  }));

  const options: { label: React.ReactNode; value: string }[] = [
    '100',
    '450',
    '900',
    '4500',
    '9000',
    '18000',
    '45000',
  ].map((el) => ({
    label: `${ECurrencySymbol[selectedAccount?.currency.toLowerCase() as ECurrency]}  ${el}`,
    value: el,
  }));

  function CustomAmountInput() {
    const { values, setFieldValue }: { values: any; setFieldValue: any } = useFormikContext();

    function onFocusCustomInput() {
      setFieldValue(EFields.amount, 'custom');
    }

    function onClickCustomRadio() {
      ref.current?.focus();
    }

    function onChangeHandler(e: any) {
      setFieldValue(EFields.customAmount, e.target.value);
      setFieldValue(EFields.amount, 'custom');
    }

    return (
      <div className="custom-amount-label-wrapper" onClick={onClickCustomRadio}>
        <div className="title">Custom Amount</div>
        <Input
          label="Amount"
          name={EFields.customAmount}
          className="custom-amount-input ml-8"
          onChange={onChangeHandler}
          onFocus={onFocusCustomInput}
          regex={/^\d*$/gm}
          ref={ref}
        />
      </div>
    );
  }

  options.push({
    label: <CustomAmountInput />,
    value: 'custom',
  });

  const validationSchema = Yup.object().shape({
    // account: FieldValidators.requiredString,
    // amount: FieldValidators.requiredNumber,
  });
  return (
    <div className="choose-amount-wrapper py-10 px-9">
      <Formik
        initialValues={{
          [EFields.account]: tradingAccounts[0],
          [EFields.amount]: options[0].value,
          [EFields.customAmount]: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          submitFn(data);
        }}
      >
        {(props: any) => {
          const { values, setFieldValue } = props;
          console.log(props);

          return (
            <Form className="m-auto form fadein-row">
              <TradingAccountsSelect
                placeholder="TradingAccountsSelect"
                name={EFields.account}
                options={tradingAccounts}
              />
              <Radio colClassName="col-4" className="mb-10" name={EFields.amount} options={options} />

              <div>
                {(values[EFields.amount] !== 'custom' && values[EFields.amount]) || values[EFields.customAmount] || '0'}
              </div>
              <Button type="submit">Proceed to Payment</Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
