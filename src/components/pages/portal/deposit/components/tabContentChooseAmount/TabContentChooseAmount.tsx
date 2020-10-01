import { Button, Input, Radio, TradingAccountsSelect } from '@components/shared';
import { ECurrency, ECurrencySymbol } from '@domain/enums';
import { MTradingAccount } from '@domain/models';
import { IStore } from '@store';
import { Form, Formik, useFormikContext } from 'formik';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { availableAmounts, depositActionCreators, DepositContext } from '../../depositContext';
import './TabContentChooseAmount.scss';

enum EFields {
  'account' = 'account',
  'amount' = 'amount',
  'customAmount' = 'customAmount',
}

export function TabContentChooseAmount() {
  const ref = React.createRef<HTMLInputElement>();
  const { amount, account } = useContext<any>(DepositContext).state;
  const { dispatch } = useContext<any>(DepositContext);

  const { tradingAccounts } = useSelector<IStore, { tradingAccounts: MTradingAccount[] }>((state) => ({
    tradingAccounts: state.data.tradingData.accounts,
  }));

  const options: { label: React.ReactNode; value: string }[] = availableAmounts.map((el) => ({
    label: `${ECurrencySymbol[account?.currency.toLowerCase() as ECurrency]}  ${el}`,
    value: el,
  }));

  const { t } = useTranslation();

  function CustomAmountInput() {
    const { values, setFieldValue }: { values: any; setFieldValue: any } = useFormikContext();

    return (
      <div className="custom-amount-label-wrapper" onClick={() => ref.current?.focus()}>
        <div className="title">Custom Amount</div>
        <Input
          label="Amount"
          name={EFields.customAmount}
          className="custom-amount-input ml-8"
          onChange={(e: { target: { value: any } }) => {
            setFieldValue(EFields.customAmount, e.target.value);
            setFieldValue(EFields.amount, 'custom');
          }}
          onFocus={() => setFieldValue(EFields.amount, 'custom')}
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
  //TODO setup validataion
  const validationSchema = Yup.object().shape({
    // account: FieldValidators.requiredString,
    // amount: FieldValidators.requiredNumber,
  });
  const preselectedAmount = availableAmounts.includes(amount) ? amount : 'custom';
  const preselectedCustomAmount = !availableAmounts.includes(amount) ? amount : '';
  return (
    <div className="choose-amount-wrapper py-10 px-9">
      <Formik
        initialValues={{
          [EFields.account]: account ?? tradingAccounts[0],
          [EFields.amount]: preselectedAmount,
          [EFields.customAmount]: preselectedCustomAmount,
        }}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          const amount =
            data[EFields.amount] !== 'custom' && !!data[EFields.amount]
              ? data[EFields.amount]
              : data[EFields.customAmount];
          dispatch(depositActionCreators.setAmount(amount));
        }}
      >
        {(props: any) => {
          const { values, setFieldValue } = props;

          return (
            <Form className="m-auto form fadein-row">
              <TradingAccountsSelect
                placeholder="TradingAccountsSelect"
                name={EFields.account}
                options={tradingAccounts}
                onChange={(e: MTradingAccount) => dispatch(depositActionCreators.setAccount(e))}
              />
              <Radio
                colClassName="col-4"
                className="mb-10"
                name={EFields.amount}
                options={options}
                onClick={(e: any) => {
                  if (e.target.value !== 'custom') {
                    setFieldValue(EFields.customAmount, '');
                  }
                }}
              />

              <div>
                {(values[EFields.amount] !== 'custom' && values[EFields.amount]) || values[EFields.customAmount] || '0'}
              </div>
              <Button type="submit">{t('Proceed to Payment')}</Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
