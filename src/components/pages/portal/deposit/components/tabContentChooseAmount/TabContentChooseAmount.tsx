import { Button, IRadioItem, Input, Radio, Svg, TradingAccountsSelect } from '@components/shared';
import { FieldValidators } from '@domain';
import { AllowedCurrToMethodMap, ETradingType } from '@domain/enums';
import { MClientSettings, MTradingAccount } from '@domain/models';
import { IStore } from '@store';
import classNames from 'classnames';
import { Form, Formik, FormikProps, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { Col, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { depositActionCreators, useDepositDispatch, useDepositState } from '../../deposit.context';
import './TabContentChooseAmount.scss';
import { useResponsive } from 'ahooks';

enum EFields {
  'account' = 'account',
  'amount' = 'amount',
  'customAmount' = 'customAmount',
}

export function TabContentChooseAmount() {
  const { amount, account, staticAmounts, method } = useDepositState();
  const { settings, tradingAccounts } = useSelector<
    IStore,
    { settings: MClientSettings; tradingAccounts: MTradingAccount[] }
  >((state) => ({
    settings: state.data.client.settings,
    tradingAccounts: state.data.tradingData.accounts.filter(
      (acc) => acc.type !== ETradingType.demo && AllowedCurrToMethodMap?.[method as string].includes(acc?.currency),
    ),
  }));
  const { state: locationState } = useLocation<{ accountId: string }>();
  const dispatch = useDepositDispatch();
  const responsive = useResponsive();
  const { t } = useTranslation();
  const ref = React.createRef<HTMLInputElement>();

  // @ts-ignore
  const options: IRadioItem[] = staticAmounts?.map((el: any) => ({
    label: `${account?.currencySymbol}  ${el}`,
    value: el,
    className: 'amount-item',
  }));

  const validationSchema = Yup.object().shape({
    account: Yup.object().required('This field is required'),
    amount: responsive.lg ? FieldValidators.requiredString : FieldValidators.notRequiredString,
    customAmount: Yup.number().test('isCustomAmount', '', function (value) {
      const { path, parent, createError } = this;
      const { account, amount }: { account: MTradingAccount; amount: string } = parent;
      if (
        !!value &&
        (amount === 'custom' || !responsive.lg) &&
        settings.min_deposit_amount &&
        value < settings.min_deposit_amount
      ) {
        return createError({
          path,
          message: `${t('Minimum amount is')} ${settings.min_deposit_amount}${account?.currencySymbol}`,
        });
      } else if (!value && (amount === 'custom' || !responsive.lg)) {
        return createError({
          path,
          message: t('This field is required'),
        });
      }
      return true;
    }),
  });

  function CustomAmountInput() {
    const { values, setFieldValue, resetForm } = useFormikContext();
    return (
      <div onClick={() => ref.current?.focus()}>
        <div className="title mt-7 mb-8">{t('Custom Amount')}</div>
        <Input
          label={t('Amount')}
          name={EFields.customAmount}
          className="custom-amount-input"
          onChange={(e: { target: { value: string } }) => {
            const value = e.target.value;
            if (/^\d{0,9}$/gm.test(value) || value === '') {
              if (value !== '' && settings.min_deposit_amount && parseInt(value, 10) >= settings.min_deposit_amount) {
                resetForm({
                  values: {
                    ...(values as object),
                    [EFields.customAmount]: value,
                    [EFields.amount]: 'custom',
                  },
                });
              } else {
                setFieldValue(EFields.customAmount, value);
                setFieldValue(EFields.amount, 'custom');
              }
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
    className: 'custom-amount-item mt-8',
  });

  const preselectedAmount =
    responsive.lg && amount ? (staticAmounts?.includes(parseInt(amount)) ? amount : 'custom') : '';
  const preselectedCustomAmount = amount && !staticAmounts?.includes(parseInt(amount)) ? amount : '';

  function formatAmount(amount: number) {
    return Intl.NumberFormat(navigator?.language ?? 'en-US').format(amount);
  }

  const initialValues = {
    [EFields.account]:
      tradingAccounts.find((account) => account.accountId === locationState?.accountId) ??
      account ??
      tradingAccounts[0],
    [EFields.amount]: preselectedAmount,
    [EFields.customAmount]: preselectedCustomAmount,
  };

  return (
    <div className="choose-amount-wrapper">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          const amount =
            responsive.lg && data[EFields.amount] !== 'custom' && !!data[EFields.amount]
              ? data[EFields.amount]
              : data[EFields.customAmount];
          dispatch(depositActionCreators.setAmount(amount));
        }}
      >
        {({ values, setFieldValue }: FormikProps<any>) => {
          const amount = (
            <Col xs={8} md={7} xl={8} className="ml-auto">
              <div className="you-get-amount text-right text-lg-left">
                <span className="you-get-amount__symbol pr-3">{values[EFields.account].currencySymbol}</span>
                {(responsive.lg && values[EFields.amount] !== 'custom' && formatAmount(values[EFields.amount])) ||
                  formatAmount(values[EFields.customAmount]) ||
                  '0'}
              </div>
            </Col>
          );

          useEffect(() => {
            if (!tradingAccounts.map((e) => e.accountId).includes(values[EFields.account]?.accountId as string)) {
              setFieldValue(EFields.account, tradingAccounts[0]);
              dispatch(depositActionCreators.setAccount(tradingAccounts[0]));
            }
          }, [method]);

          return (
            <Form className="m-auto form">
              {account?.type !== ETradingType.fake && (
                <Row>
                  <Col xs={12} md={6} lg={7} xl={5}>
                    {t('Choose account to fund')}

                    <TradingAccountsSelect
                      className={classNames(tradingAccounts.length === 1 ? 'd-none' : '')}
                      placeholder={t('Choose Trading Account')}
                      name={EFields.account}
                      options={tradingAccounts}
                      onChange={(e: MTradingAccount) => dispatch(depositActionCreators.setAccount(e))}
                    />
                  </Col>
                </Row>
              )}
              {responsive.lg && (
                <Radio
                  optionClassName="col-4 pr-0"
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
              {!responsive.lg && (
                <Input
                  inputMode="numeric"
                  type="number"
                  label={t('Amount')}
                  name={EFields.customAmount}
                  className="custom-amount-input"
                  regex={/^\d{0,9}$/gm}
                />
              )}
              <Row className="mb-6 mt-5 mt-md-0 align-items-center">
                <Col xs={4} className="you-get-title">
                  {t('You get')}
                </Col>
                {!responsive.lg && amount}
                {responsive.lg && (
                  <Col md={5} xl={4} className="d-none d-lg-flex ml-auto">
                    <Svg href="secure-payment" />
                  </Col>
                )}
              </Row>
              <Row className="align-items-center">
                {responsive.lg && amount}
                <Col md={5} xl={4}>
                  <Button type="submit">{t('Proceed to Payment')}</Button>
                </Col>
                {!responsive.lg && (
                  <Col md={5} xl={4} className="d-flex mt-9 mt-md-0 ml-md-auto">
                    <Svg href="secure-payment" height={40} className="m-auto" />
                  </Col>
                )}
              </Row>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
