import { Button, CurrencySelect, Radio, Select } from '@components/shared';
import { FieldValidators, accountTypePip } from '@domain';
import { ERegSteps, ETradingAccountType } from '@domain/enums';
import { Form, Formik, FormikValues } from 'formik';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { IStore } from '@store';
import { MClientSettings } from '@domain/models';
import classNames from 'classnames';
import './ThirdStep.scss';

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
  const tradingAccounts = [
    {
      label: (
        <>
          <div className="name">{t('Fixed')}</div>
          <div className="spread">
            {t('Fixed Spreads')}
            <br />
            {t('From #', { val: accountTypePip.fixed })}
          </div>
          <div className="commission">{t('No commission')}</div>
        </>
      ),
      value: ETradingAccountType.fixed,
    },
    {
      label: (
        <>
          <div className="name">{t('Variable')}</div>
          <div className="spread">
            {t('Floating Spreads')}
            <br />
            {t('From #', { val: accountTypePip.variable })}
          </div>
          <div className="commission">{t('No commission')}</div>
        </>
      ),
      value: ETradingAccountType.variable,
    },
  ].filter((el) => clientSettings.allowed_account_types?.includes(el.value));

  const currencies = clientSettings.getCurrenciesSelectList();
  const leverages = clientSettings.getLeveragesSelectList();
  const platforms = clientSettings.getPlatformsSelectList();

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
          firstdeposit_platform: platforms[0].value,
          account_type: tradingAccounts[0].value,
          currency: currencies[Object.keys(currencies)[0]].code,
          leverage: leverages[0].value,
        }}
        validationSchema={validationSchema}
        onSubmit={Submit}
      >
        {(props: any) => {
          return (
            <Form className="m-auto form fadein-row">
              {platforms.length > 1 && <h4 className="section-title mb-5">{t('Choose Trading Platform')}</h4>}
              <Radio
                optionClassName="col-6"
                className={classNames('mb-10', platforms.length === 1 && 'justify-content-center')}
                name={EFields.firstdeposit_platform}
                options={platforms}
              />
              <h4 className="section-title mb-5">{t('Choose Account Type')}</h4>
              <Radio
                className={`mb-10 account_type justify-content-between no-gutters totalAccTypes_${clientSettings.allowed_account_types?.length}`}
                name={EFields.account_type}
                options={tradingAccounts}
              />
              <Row>
                <Col xs={12} sm={6}>
                  <h5 className="select-title">{t('Account Currency')}</h5>
                  <CurrencySelect name={EFields.currency} options={currencies} />
                </Col>
                <Col xs={12} sm={6} className="fadein-row">
                  <h5 className="select-title">{t('Leverage')}</h5>
                  <Select options={leverages} name={EFields.leverage} />
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
