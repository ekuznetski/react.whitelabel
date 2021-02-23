import { Button, CountrySelect, Input, Radio } from '@components/shared';
import { FieldValidators } from '@domain';
import { EFormStatus, ENotificationType } from '@domain/enums';
import { ITins } from '@domain/interfaces';
import { MTins } from '@domain/models';
import { EActionTypes, IStore, ac_showNotification, ac_updateTins } from '@store';
import { Form, Formik, FormikValues } from 'formik';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { config } from './';
import './TaxIdentification.scss';

enum EFields {
  choice = 'choice',
  reason = 'reason',
  tins = 'tins',
  taxCountry = 'taxCountry',
  taxNumber = 'taxNumber',
}

export const TaxIdentification = React.memo(function TaxIdentification() {
  const { tins } = useSelector<IStore, { tins: MTins }>((state) => ({
    tins: state.data.client.tins,
  }));
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const initialValues = {
    [EFields.choice]: tins.choice ? tins.choice : true,
    [EFields.reason]: tins.reason ? tins.reason : '',
    [EFields.tins]: tins.tins
      ? tins.tins.map((e) => ({
          [EFields.taxCountry]: e.country,
          [EFields.taxNumber]: e.tax_number,
        }))
      : [
          {
            [EFields.taxCountry]: '' as {},
            [EFields.taxNumber]: '',
          },
        ],
  };

  const validationSchema = Yup.lazy((values: typeof initialValues): any =>
    Yup.object().shape({
      [EFields.choice]: Yup.boolean().required(),
      [EFields.reason]: Yup.string().when(EFields.choice, {
        is: false,
        then: FieldValidators.requiredString,
        otherwise: FieldValidators.notRequiredString,
      }),
      [EFields.tins]: Yup.array().when(EFields.choice, {
        is: true,
        then: Yup.array(
          Yup.object().shape({
            [EFields.taxCountry]: Yup.lazy(() =>
              !!values[EFields.tins].filter((el) => !!(el?.[EFields.taxCountry] && el?.[EFields.taxNumber])).length
                ? FieldValidators.notRequiredString
                : FieldValidators.requiredString,
            ),
            [EFields.taxNumber]: Yup.lazy(() =>
              !!values[EFields.tins].filter((el) => !!(el?.[EFields.taxCountry] && el?.[EFields.taxNumber])).length
                ? FieldValidators.notRequiredString
                : FieldValidators.requiredString,
            ),
          }),
        ).min(2, t('At least one Tax ID should be added')),
        otherwise: Yup.array().notRequired(),
      }),
    }),
  );

  function Submit(data: FormikValues) {
    const values = { ...data };
    values.reason = null;
    values.choice = values.choice.toString();
    values.tins = JSON.stringify(
      values.tins
        .filter((e: any) => e.taxCountry && e.taxNumber)
        .map((e: any) => ({
          tax_number: e.taxNumber,
          country: e.taxCountry?.name,
        })),
    );

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
      {t('Tax Resident List of Countries')}
      <Formik
        initialStatus={tins.tins.length === config.maxTaxCountries ? EFormStatus.disabled : null}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={Submit}
      >
        {({ values, setValues, errors, resetForm }) => {
          useEffect(() => {
            resetForm({ values: { ...initialValues, [EFields.choice]: values[EFields.choice] } });
          }, [values[EFields.choice]]);
          function removeTinsRow(i: number) {
            values[EFields.tins].splice(i, 1);
            setValues(values);
          }

          function isTinsRowValid(i: number) {
            return !!(
              values[EFields.tins]?.[i]?.[EFields.taxCountry] && values[EFields.tins]?.[i]?.[EFields.taxNumber]
            );
          }
          if (
            values[EFields.tins].filter((_: any, i: number) => !isTinsRowValid(i)).length < 1 &&
            values[EFields.tins].length < config.maxTaxCountries
          ) {
            values[EFields.tins].push({
              taxCountry: '' as {},
              taxNumber: '',
            });
          }
          return (
            <Form className="tax-identification__form mt-10">
              <Row>
                <Col xs={12} className="tax-identification__col-title mt-n2 mb-2">
                  {t('Do you have Tax Identification Number?')}
                </Col>
                <Col xs={7}>
                  <Radio name={EFields.choice} options={config.haveTinsNumber} disabled={!!tins.tins.length} />
                </Col>
                <Col xs={12} className="form-breakline mt-10 mb-10" />
              </Row>
              {values.choice &&
                values[EFields.tins].map((e: any, i: number) => {
                  return (
                    <div className="d-flex justify-content-between" key={e?.taxCountry?.code + i}>
                      <Row className="tins-row">
                        <Col xs={6}>
                          <CountrySelect label={t('Country')} name={`${EFields.tins}.${i}.${EFields.taxCountry}`} disabled={i < tins.tins.length} />
                        </Col>
                        <Col xs={6}>
                          <Input
                            label={t('Tax Identification Number')}
                            name={`${EFields.tins}.${i}.${EFields.taxNumber}`}
                            disabled={i < tins.tins.length}
                          />
                        </Col>
                      </Row>
                      <Button
                        type="button"
                        className="remove-tins-row"
                        onClick={() => removeTinsRow(i)}
                        disabled={!isTinsRowValid(i) || i < tins.tins.length}
                      >
                        -
                      </Button>
                    </div>
                  );
                })}
              {!values.choice && (
                <Row>
                  <Col xs={12}>
                    <Radio className="mb-8" name={EFields.reason} options={config.chooseReason} />
                  </Col>
                </Row>
              )}
              <Button type="submit" loadingOnAction={EActionTypes.updateTins}>
                {t('Submit')}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
});
