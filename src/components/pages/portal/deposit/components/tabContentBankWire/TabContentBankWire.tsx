import { Button, Radio, TradingAccountsSelect } from '@components/shared';
import { FieldValidators } from '@domain';
import { ECurrencyCode, ETradingType } from '@domain/enums';
import { MTradingAccount } from '@domain/models';
import { IStore } from '@store';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { Col, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { DepositContext, IDepositState, depositActionCreators } from '../../deposit.context';
import { config } from './TabContentBankWire.config';
import './TabContentBankWire.scss';

export function TabContentBankWire() {
  const { account }: IDepositState = useContext(DepositContext).state;
  const { dispatch } = useContext<any>(DepositContext);

  const { tradingAccounts } = useSelector<IStore, { tradingAccounts: MTradingAccount[] }>((state) => ({
    tradingAccounts: state.data.tradingData.accounts.filter((acc) => acc.type !== ETradingType.demo),
  }));
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    account: FieldValidators.requiredString,
    bank: FieldValidators.requiredString,
  });

  return (
    <div className="bank-wire-deposit">
      <Formik
        initialValues={{
          account: account ?? tradingAccounts[0],
        }}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        {({ values, setFieldValue }: any) => {
          const banksCurrency =
            (values.account?.currency && config.banks[values.account?.currency]) ?? config.banks[ECurrencyCode.usd];
          return (
            <Form className="m-auto form">
              {account?.type !== ETradingType.fake && (
                <Row>
                  <Col xs={12} sm={5}>
                    Choose account to fund
                    <TradingAccountsSelect
                      className={classNames(tradingAccounts.length === 1 ? 'd-none' : '')}
                      placeholder={t('Choose Trading Account')}
                      name="account"
                      options={tradingAccounts}
                      onChange={(e: MTradingAccount) => {
                        dispatch(depositActionCreators.setAccount(e));
                        setFieldValue('bank', banksCurrency[0].filename.replace('.pdf', ''));
                      }}
                    />
                  </Col>
                </Row>
              )}
              <Row>
                <Col xs={12}>
                  {account?.currency && (
                    <Radio
                      optionClassName={classNames(
                        config.banks[account.currency]?.length === 1
                          ? 'col-6 col-xs-12'
                          : `col-${12 / banksCurrency?.length ?? 1}`,
                      )}
                      className="mb-10"
                      name="bank"
                      showMarkDot={true}
                      options={(config.banks[account.currency] ?? config.banks[ECurrencyCode.usd]).map((bank: any) => ({
                        label: <BankRadio bank={bank} />,
                        value: bank.filename.replace('.pdf', ''),
                      }))}
                    />
                  )}
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
      <div className="bank-wire-footer">
        <Row>
          <Col sm={6}>
            <div className="bank-wire-footer__destination">
              {t('Transfer to the bank')}
              <div>
                <span className="bank-name mr-5">Barclays</span> <span>{account?.currency}</span>
              </div>
            </div>
          </Col>
          <Col sm={6}>
            <Row>
              <Col sm={6}>
                <Button>{t('Download')}</Button>
              </Col>
              <Col sm={6}>
                <Button>{t('Print')}</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

function BankRadio({ bank }: any) {
  const { t } = useTranslation();

  return (
    <div className="bank-details">
      <div className="bank-header mt-9">
        <div className="bank-header__title">{bank.bankTitle}</div>
        <div className="bank-header__currency py-3 mt-9 mb-7">{bank.currency}</div>
      </div>
      <div className="bank-wrapper">
        <div className="bank-wrapper__title">{t('Beneficiary name')}</div>
        <div className="bank-wrapper__text pb-3">{bank.beneficiaryName}</div>

        <div className="bank-wrapper__title">{t('Beneficiary bank name')}</div>
        <div className="bank-wrapper__text pb-3">{bank.beneficiaryBankName}</div>

        <div className="bank-wrapper__title">{t('Beneficiary Bank address')}</div>
        <div className="bank-wrapper__text pb-3">{bank.beneficiary_bank_address}</div>

        <div className="bank-wrapper__title">SWIFT:</div>
        <div className="bank-wrapper__text pb-3">{bank.swift}</div>

        <div className="bank-wrapper__title">IBAN:</div>
        <div className="bank-wrapper__text pb-3">{bank.iban}</div>

        <div className="bank-wrapper__title">{t('Bank account number')}</div>
        <div className="bank-wrapper__text pb-3">{bank.accountNumber}</div>

        <div className="bank-wrapper__title">{t('Currency')}:</div>
        <div className="bank-wrapper__text pb-3">{bank.currency}</div>
      </div>
    </div>
  );
}
