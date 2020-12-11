import { Button, CurrencySelect, Radio, Select } from '@components/shared';
import { FieldValidators } from '@domain';
import {
  Currencies,
  EAccountLeverage,
  ECurrencyCode,
  ERegSteps,
  ETradingAccountType,
  ETradingPlatform,
} from '@domain/enums';
import { Form, Formik, FormikValues } from 'formik';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import './ThirdStep.scss';
import { useSelector } from 'react-redux';
import { IStore } from '@store';
import { MClientSettings } from '@domain/models';

enum EFields {
  'firstdeposit_platform' = 'firstdeposit_platform',
  'account_type' = 'account_type',
  'currency' = 'currency',
  'leverage' = 'leverage',
}

export function ThirdStep({ submitFn }: any) {
  const { clientSettings } = useSelector<IStore, { clientSettings: MClientSettings }>((state) => ({
    clientSettings: state.data.client.settings,
  }));
  const { t } = useTranslation();
  
  const validationSchema = Yup.object().shape({
    firstdeposit_platform: FieldValidators.requiredString,
    account_type: FieldValidators.requiredString,
    currency: FieldValidators.requiredString,
    leverage: FieldValidators.requiredString,
  });
  const accountTypeOptions = [
    {
      key: ETradingAccountType.fixed,
      label: (
        <>
          <div className="name">{t('Fixed')}</div>
          <div className="spread">
            {t('Fixed Spreads')}
            <br />
            {t('From #', { val: '1.8' })}
          </div>
          <div className="commission">{t('No commission')}</div>
        </>
      ),
      value: t('Fixed'),
    },
    {
      key: ETradingAccountType.classic,
      label: (
        <>
          <div className="name">{t('Classic')}</div>
          <div className="spread">
            {t('Floating Spreads')}
            <br />
            {t('From #', { val: '1.2' })}
          </div>
          <div className="commission">{t('No commission')}</div>
        </>
      ),
      value: t('Classic'),
    },
    {
      key: ETradingAccountType.raw,
      label: (
        <>
          <div className="name">{t('Raw')}</div>
          <div className="spread">
            {t('Fixed Spreads')}
            <br />
            {t('From #', { val: '0.2' })}
          </div>
          <div className="commission">{t('Plus # per round', { val: '4' })}</div>
        </>
      ),
      value: 'Raw',
    },
  ].filter((el) => clientSettings.allowed_account_types.includes(el.key));

  const currencies = Object.keys(Currencies).reduce((acc, key) => {
    if (clientSettings.allowed_currencies.includes(ECurrencyCode[key as keyof typeof ECurrencyCode])) {
      Object.assign(acc, { [key]: Currencies[key] });
    }
    return acc;
  }, {});
  const leverageList = [
    { label: EAccountLeverage['1_500'], value: '500' },
    { label: EAccountLeverage['1_400'], value: '400' },
    { label: EAccountLeverage['1_300'], value: '300' },
    { label: EAccountLeverage['1_200'], value: '200' },
    { label: EAccountLeverage['1_100'], value: '100' },
  ].filter((e) => clientSettings?.allowed_leverages.includes(e.label));

  function Submit(data: FormikValues) {
    data = Object.keys(data).reduce((acc, key) => {
      if (!!data[key]) {
        Object.assign(acc, { [key]: data[key] });
      }
      return acc;
    }, {});
    submitFn({ [ERegSteps.step3]: data });
  }

  return (
    <div className="registration-third-step">
      <Formik
        initialValues={{
          firstdeposit_platform: ETradingPlatform.mt4,
          account_type: ETradingAccountType.classic,
          currency: ECurrencyCode.usd,
          leverage: leverageList[0].value,
        }}
        validationSchema={validationSchema}
        onSubmit={Submit}
      >
        {(props: any) => {
          return (
            <Form className="m-auto form fadein-row">
              <h4 className="section-title mb-5">{t('Choose Trading Platform')}</h4>
              <Radio
                className="mb-10"
                name={EFields.firstdeposit_platform}
                options={[
                  { label: 'MetaTrader 4', value: ETradingPlatform.mt4 },
                  { label: 'MetaTrader 5', value: ETradingPlatform.mt5 },
                ].filter((e) => clientSettings?.allowed_platforms.includes(e.value))}
              />
              <h4 className="section-title mb-5">{t('Choose Account Type')}</h4>
              <Radio
                className={`mb-10 account_type justify-content-between no-gutters totalAccTypes_${clientSettings.allowed_account_types.length}`}
                name={EFields.account_type}
                options={accountTypeOptions}
              />
              <Row>
                <Col xs={12} sm={6}>
                  <h5 className="select-title">{t('Account Currency')}</h5>
                  <CurrencySelect name={EFields.currency} options={currencies} />
                </Col>
                <Col xs={12} sm={6} className="fadein-row">
                  <h5 className="select-title">{t('Leverage')}</h5>
                  <Select options={leverageList} name={EFields.leverage} />
                </Col>
              </Row>
              <Button type="submit">{t('Next')}</Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
