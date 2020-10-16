import { Button, Input, IRadioItem, Radio, Svg, TradingAccountsSelect } from '@components/shared';
import { ECurrency, ECurrencySymbol } from '@domain/enums';
import { MTradingAccount } from '@domain/models';
import { IStore } from '@store';
import { Form, Formik, FormikProps, useFormikContext } from 'formik';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { availableAmounts, depositActionCreators, DepositContext } from '../../depositContext';
import './TabContentChooseAmount.scss';
import classNames from 'classnames';
import { Col, Row } from 'react-bootstrap';
import { useDeviceDetect } from '@utils/hooks';
import { FieldValidators } from '@domain';

enum EFields {
  'account' = 'account',
  'amount' = 'amount',
  'customAmount' = 'customAmount',
}

export function TabContentChooseAmount() {
  const { tradingAccounts } = useSelector<IStore, { tradingAccounts: MTradingAccount[] }>((state) => ({
    tradingAccounts: state.data.tradingData.accounts,
  }));
  const { amount, account } = useContext<any>(DepositContext).state;
  const { dispatch } = useContext<any>(DepositContext);
  const { t } = useTranslation();
  const { isDesktop } = useDeviceDetect();
  const ref = React.createRef<HTMLInputElement>();

  const options: IRadioItem[] = availableAmounts.map((el) => ({
    label: `${account?.currencySymbol}  ${el}`,
    value: el,
    className: 'amount-item',
  }));

  const validationSchema = Yup.object().shape({
    account: FieldValidators.requiredString,
    amount: isDesktop ? FieldValidators.requiredString : FieldValidators.notRequiredString,
    customAmount: Yup.number().when([EFields.amount], {
      is: (amount) => !!amount && amount !== 'custom',
      then: FieldValidators.notRequiredNumber,
      otherwise: FieldValidators.requiredNumber,
    }),
  });

  function CustomAmountInput() {
    const { values, setFieldValue }: { values: any; setFieldValue: any } = useFormikContext();
    return (
      <div onClick={() => ref.current?.focus()}>
        <div className="title ml-13 mt-7 mb-10">{t('Custom Amount')}</div>
        <Input
          label={t('Amount')}
          name={EFields.customAmount}
          className="custom-amount-input ml-8"
          onChange={(e: { target: { value: string } }) => {
            const value = e.target.value;
            if (/^\d{0,9}$/gm.test(value) || value === '') {
              setFieldValue(EFields.customAmount, value);
              setFieldValue(EFields.amount, 'custom');
            }
          }}
          type="number"
          inputMode="numeric"
          onFocus={() => setFieldValue(EFields.amount, 'custom')}
          ref={ref}
          regex={/^\d{0,9}$/gm}
        />
      </div>
    );
  }

  options.push({
    label: <CustomAmountInput />,
    value: 'custom',
    className: 'custom-amount-item',
  });

  const preselectedAmount = isDesktop ? (availableAmounts.includes(amount) ? amount : 'custom') : '';
  const preselectedCustomAmount = !availableAmounts.includes(amount) ? amount : '';

  function formatAmount(amount: number) {
    return Intl.NumberFormat(navigator?.language ?? 'en-US').format(amount);
  }

  return (
    <div className="choose-amount-wrapper">
      <Formik
        initialValues={{
          [EFields.account]: account ?? tradingAccounts[0],
          [EFields.amount]: preselectedAmount,
          [EFields.customAmount]: preselectedCustomAmount,
        }}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          const amount =
            isDesktop && data[EFields.amount] !== 'custom' && !!data[EFields.amount]
              ? data[EFields.amount]
              : data[EFields.customAmount];
          dispatch(depositActionCreators.setAmount(amount));
        }}
      >
        {({ values, setFieldValue }: FormikProps<any>) => {
          return (
            <Form className="m-auto form fadein-row">
              <Row>
                <Col xs={12} md={6} lg={7} xl={5}>
                  Choose account to fund
                  <TradingAccountsSelect
                    className={classNames(tradingAccounts.length === 1 ? 'd-none' : '')}
                    placeholder={t('Choose Trading Account')}
                    name={EFields.account}
                    options={tradingAccounts}
                    onChange={(e: MTradingAccount) => dispatch(depositActionCreators.setAccount(e))}
                  />
                </Col>
              </Row>
              {isDesktop && (
                <Radio
                  colClassName="col-4 mb-7 pr-0"
                  className="mb-10 mr-0"
                  name={EFields.amount}
                  options={options}
                  onClick={(e: any) => {
                    if (e.target.value !== 'custom') {
                      setFieldValue(EFields.customAmount, '');
                    }
                  }}
                />
              )}
              {!isDesktop && (
                <Input
                  inputMode="numeric"
                  type="number"
                  label={t('Amount')}
                  name={EFields.customAmount}
                  className="custom-amount-input"
                  regex={/^\d{0,9}$/gm}
                />
              )}
              <Row className="mb-6 mt-5 mt-md-0">
                <Col className="you-get-title">{t('You get')}</Col>
              </Row>
              <Row>
                <Col md={7} xl={8}>
                  <div className="you-get-amount d-flex align-items-center">
                    <span className="you-get-amount__symbol pr-3">{values[EFields.account].currencySymbol}</span>
                    {(values[EFields.amount] !== 'custom' && values[EFields.amount]) ||
                      formatAmount(values[EFields.customAmount]) ||
                      '0'}
                  </div>
                </Col>
                <Col md={5} xl={4} className="align-items-center d-flex">
                  <Button type="submit">{t('Proceed to Payment')}</Button>
                </Col>
              </Row>
              <Row>
                <Col
                  md={{ span: 4, offset: 8 }}
                  lg={{ span: 5, offset: 7 }}
                  className="d-flex justify-content-between align-items-center"
                >
                  <Svg href="shrimp" height="40" width="45" />
                  <Svg href="shrimp" height="40" width="45" />
                  <Svg href="shrimp" height="40" width="45" />
                  <Svg href="shrimp" height="40" width="45" />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
