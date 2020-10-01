import { ERegSteps } from '@components/pages';
import { Button, CurrencySelect, Radio, Select } from '@components/shared';
import { FieldValidators } from '@domain';
import { ECurrencyCode, ETradingAccountType, ETradingPlatform } from '@domain/enums';
import { Form, Formik } from 'formik';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import './ThirdStep.scss';

enum EFields {
  'platform' = 'platform',
  'account_type' = 'account_type',
  'currency' = 'currency',
  'leverage' = 'leverage',
}

export function ThirdStep({ submitFn }: any) {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    platform: FieldValidators.requiredString,
    account_type: FieldValidators.requiredString,
    currency: FieldValidators.requiredString,
    leverage: Yup.string().when('platform', {
      is: (val: string) => val === ETradingPlatform.mt4,
      then: FieldValidators.requiredString,
      otherwise: Yup.string().notRequired(),
    }),
  });

  const accountTypeOptions = [
    {
      label: (
        <>
          <div className="name">Fixed</div>
          <div className="spread">
            Fixed Spreads
            <br />
            from 1.8
          </div>
          <div className="commission">No commission</div>
          <div className="select-mark" />
        </>
      ),
      value: 'Fixed',
    },
    {
      label: (
        <>
          <div className="name">Classic</div>
          <div className="spread">
            Floating Spreads
            <br />
            from 1.2
          </div>
          <div className="commission">No commission</div>
          <div className="select-mark" />
        </>
      ),
      value: 'Classic',
    },
    {
      label: (
        <>
          <div className="name">Raw</div>
          <div className="spread">
            Fixed Spreads
            <br />
            from 0.2
          </div>
          <div className="commission">+ $4 per round</div>
          <div className="select-mark" />
        </>
      ),
      value: 'Raw',
    },
  ];

  const leverageList = [
    { label: '1:500', value: '500' },
    { label: '1:400', value: '400' },
    { label: '1:300', value: '300' },
    { label: '1:200', value: '200' },
    { label: '1:100', value: '100' },
  ];

  return (
    <div className="registration-third-step">
      <Formik
        initialValues={{
          platform: '',
          account_type: ETradingAccountType.classic,
          currency: ECurrencyCode.usd,
          leverage: leverageList[0].value,
        }}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          console.log(data);
          submitFn({ [ERegSteps.step3]: data });
        }}
      >
        {(props: any) => {
          const { values, setFieldValue } = props;
          if (values.leverage && values.platform === ETradingPlatform.mt4) {
            setFieldValue(EFields.leverage, '');
          }
          return (
            <Form className="m-auto form fadein-row">
              <h4 className="section-title mb-5">{t('Choose Trading Platform')}</h4>
              <Radio
                className="mb-10"
                name={EFields.platform}
                options={[
                  { label: 'MetaTrader 4', value: ETradingPlatform.mt4 },
                  { label: 'MetaTrader 5', value: ETradingPlatform.mt5 },
                ]}
              />
              <h4 className="section-title mb-5">{t('Choose Account Type')}</h4>
              <Radio className="mb-10 account_type" name={EFields.account_type} options={accountTypeOptions} />
              <Row>
                <Col xs={12} sm={6}>
                  <h5 className="select-title">{t('Account Currency')}</h5>
                  <CurrencySelect name={EFields.currency} />
                </Col>
                {values.platform === ETradingPlatform.mt4 && (
                  <Col xs={12} sm={6} className="fadein-row">
                    <h5 className="select-title">{t('Leverage')}</h5>
                    <Select options={leverageList} name={EFields.leverage} />
                  </Col>
                )}
              </Row>
              <Button type="submit">{t('Next')}</Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
