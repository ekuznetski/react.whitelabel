import { Alert, Button, CountrySelect, Input } from '@components/shared';
import { MTins } from '@domain/models';
import { IStore } from '@store';
import { Formik, FormikProps, FormikValues } from 'formik';
import React, { memo } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import './TaxIdentification.scss';

export const TaxIdentification = memo(function TaxIdentification() {
  const { tins } = useSelector<IStore, { tins: MTins }>((state) => ({
    tins: state.data.client.tins,
  }));
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({});

  function Submit(data: FormikValues) {}

  return (
    <div className="tax-identification">
      <Alert className="col-12 mb-7" type="text" showIcon={false}>
        {t('Tax Identification Alert')}
      </Alert>
      {t('Tax Resident List of Countries')}
      <Formik initialValues={{}} validationSchema={validationSchema} onSubmit={Submit}>
        {({ values }: FormikProps<any>) => {
          return (
            <Form className="tax-identification__form mt-5">
              <div className="tax-identification__row">
                <Row>
                  <Col xs={6}>
                    <CountrySelect label={t('Country')} name="nationality" />
                  </Col>
                  <Col xs={6}>
                    <Input label={t('Tax Identification Number')} name="taxNo" />
                  </Col>
                </Row>
                <Button className="ml-auto">+</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
});
