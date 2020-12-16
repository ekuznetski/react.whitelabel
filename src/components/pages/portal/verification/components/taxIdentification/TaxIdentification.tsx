import { Alert, Button, CountrySelect, Input, Radio } from '@components/shared';
import { MTins } from '@domain/models';
import { EActionTypes, IStore } from '@store';
import { Formik, FormikProps, FormikValues } from 'formik';
import React, { memo } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { config } from './';
import './TaxIdentification.scss';

enum EFields {
  choice = 'choice',
  reason = 'reason',
  taxCountry = 'taxCountry',
  taxNumber = 'taxNumber',
}

export const TaxIdentification = memo(function TaxIdentification() {
  const { tins } = useSelector<IStore, { tins: MTins }>((state) => ({
    tins: state.data.client.tins,
  }));
  const { t } = useTranslation();

  const tinsList = Array.from(
    { length: config.maxTaxCountries },
    (_, i) =>
      tins.tins[i] || {
        country: null,
        tax_number: '',
      },
  );
  const validationSchema = Yup.object().shape({
    choice: Yup.bool().required(),
    reason: Yup.bool().required(),
    taxCountry: Yup.object().required(),
    taxNumber: Yup.object().required(),
  });

  function Submit(data: FormikValues) {

  }

  return (
    <div className="tax-identification">
      <Alert className="col-12 mb-7" type="text" showIcon={false}>
        {t('Tax Identification Alert')}
      </Alert>
      {t('Tax Resident List of Countries')}
      <Formik
        initialValues={{
          [EFields.choice]: 'yes',
        }}
        validationSchema={validationSchema}
        onSubmit={Submit}
      >
        {({ values }: FormikProps<any>) => {
          return (
            <Form className="tax-identification__form mt-10">
              <Row>
                <Col xs={12} className="tax-identification__col-title mt-n2 mb-2">
                  {t('Do you have Tax Identification Number?')}
                </Col>
                <Col xs={7}>
                  <Radio name={EFields.choice} options={config.haveTinsNumber} />
                </Col>
                <Col xs={12} className="form-breakline mt-10 mb-10" />
                {values.choice == 'yes' &&
                  tinsList.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <Col xs={6}>
                        <CountrySelect label={t('Country')} name={EFields.taxCountry} />
                      </Col>
                      <Col xs={6}>
                        <Input
                          label={t('Tax Identification Number')}
                          name={EFields.taxNumber}
                          value={item.tax_number}
                        />
                      </Col>
                    </React.Fragment>
                  ))}
                {values.choice == 'no' && (
                  <Col xs={12}>
                    <Radio className="mb-8" name={EFields.reason} options={config.chooseReason} />
                  </Col>
                )}
              </Row>
              <Button type="button" loadingOnAction={EActionTypes.addDeposit}>
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
});
