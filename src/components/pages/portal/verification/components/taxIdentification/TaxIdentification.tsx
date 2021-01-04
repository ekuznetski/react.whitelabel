import { Alert, Button, CountrySelect, Input, Radio } from '@components/shared';
import { ENotificationType } from '@domain/enums';
import { ITins } from '@domain/interfaces';
import { MTins } from '@domain/models';
import { ac_showNotification, ac_updateTins, EActionTypes, IStore } from '@store';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React, { memo, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const tinsList = useMemo(
    () =>
      Array.from(
        { length: config.maxTaxCountries },
        (_, i) =>
          tins.tins[i] || {
            country: null,
            tax_number: '',
          },
      ),
    [tins],
  );
  const validationSchema = Yup.object().shape({
    choice: Yup.bool().required(),
    reason: Yup.string().when('choice', {
      is: (val: boolean) => val,
      then: Yup.string().required('This field is required'),
      otherwise: Yup.string().notRequired(),
    }),
    taxCountry: Yup.array().when('choice', {
      is: (val: boolean) => val,
      then: Yup.array().required('This field is required'),
      otherwise: Yup.array().notRequired(),
    }),
    taxNumber: Yup.array().when('choice', {
      is: (val: boolean) => val,
      then: Yup.array().required('This field is required'),
      otherwise: Yup.array().notRequired(),
    }),
  });

  function Submit(data: FormikValues) {
    const values = { ...data };

    dispatch(
      ac_updateTins(
        values as ITins,
        () =>
          dispatch(
            ac_showNotification({
              type: ENotificationType.success,
              message: t('The Tins Form has been submitted'),
            }),
          ),
        () =>
          dispatch(
            ac_showNotification({
              type: ENotificationType.danger,
              message: t('Failed to submit Tins Form'),
            }),
          ),
      ),
    );
  }

  return (
    <div className="tax-identification">
      <Alert className="col-12 mb-7" type="text" showIcon={false}>
        {t('Tax Identification Alert')}
      </Alert>
      {t('Tax Resident List of Countries')}
      <Formik
        initialValues={{
          [EFields.taxCountry]: [],
          [EFields.taxNumber]: ['', '', ''],
          [EFields.choice]: true,
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
                {values.choice &&
                  tinsList.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <Col xs={6}>
                        <CountrySelect label={t('Country')} name={`${EFields.taxCountry}.${idx}`} />
                      </Col>
                      <Col xs={6}>
                        <Input label={t('Tax Identification Number')} name={`${EFields.taxNumber}.${idx}`} />
                      </Col>
                    </React.Fragment>
                  ))}
                {!values.choice && (
                  <Col xs={12}>
                    <Radio className="mb-8" name={EFields.reason} options={config.chooseReason} />
                  </Col>
                )}
              </Row>
              <Button type="submit" checkFormValidity loadingOnAction={EActionTypes.updateTins}>
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
});
