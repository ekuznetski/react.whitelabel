import { Button, TradingAccountsSelect } from '@components/shared';
import { MTradingAccount } from '@domain/models';
import { IStore } from '@store';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { DepositContext, IDepositState } from '../../depositContext';
import './TabContentBankWire.scss';

export function TabContentBankWire() {
  const { account }: IDepositState = useContext<any>(DepositContext).state;
  const { dispatch } = useContext<any>(DepositContext);

  const { tradingAccounts } = useSelector<IStore, { tradingAccounts: MTradingAccount[] }>((state) => ({
    tradingAccounts: state.data.tradingData.accounts,
  }));

  enum EFields {
    'account' = 'account',
  }
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    // account: FieldValidators.requiredString,
  });

  return (
    <div className="bank-wire-deposit py-10 px-9">
      <Formik
        initialValues={{
          [EFields.account]: account ?? tradingAccounts[0],
        }}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          console.log(data);
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
                onChange={console.log}
              />
            </Form>
          );
        }}
      </Formik>
      <div className="bank-details">
        <div className="bank-wrapper">
          <div className="bank-wrapper__title">{t('Beneficiary name')}</div>
          <div className="bank-wrapper__text pb-3">{t('HYCM (Europe) Limited')}</div>

          <div className="bank-wrapper__title">{t('Beneficiary bank name')}</div>
          <div className="bank-wrapper__text pb-3">Barclays Bank PLC</div>

          <div className="bank-wrapper__title">{t('Beneficiary Bank address')}</div>
          <div className="bank-wrapper__text pb-3">Leicester, Leicestershire, LE87 2BB, UNITED KINGDOM</div>

          <div className="bank-wrapper__title">SWIFT:</div>
          <div className="bank-wrapper__text pb-3">BARCGB22</div>

          <div className="bank-wrapper__title">IBAN:</div>
          <div className="bank-wrapper__text pb-3">GB72 BARC 20000084099233</div>

          <div className="bank-wrapper__title">{t('Bank account number')}</div>
          <div className="bank-wrapper__text pb-3">84099233</div>

          <div className="bank-wrapper__title">{t('Currency')}:</div>
          <div className="bank-wrapper__text pb-3">USD</div>
        </div>
      </div>
      <div className="bank-wire-footer">
        <div className="bank-wire-footer__destination">
          {t('Transfer to the bank: Barclays')} {account?.currency}
        </div>
        <Row>
          <Col xs={6}>
            <Button>{t('Download')}</Button>
          </Col>
          <Col xs={6}>
            <Button>{t('Print')}</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
