import { Button, Col, CountrySelect, Input, Radio, Row } from '@components/shared';
import { FieldValidators } from '@domain';
import { EClientStatusCode, EFormStatus, ENotificationType } from '@domain/enums';
import { ITins } from '@domain/interfaces';
import { MClientStatus, MTins } from '@domain/models';
import { ac_showNotification, ac_updateTins, EActionTypes, IStore } from '@store';
import { Form, Formik, FormikValues } from 'formik';
import React, { useEffect } from 'react';
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
  const { tins, clientStatus } = useSelector<IStore, { tins: MTins; clientStatus: MClientStatus }>((state) => ({
    tins: state.data.client.tins,
    clientStatus: state.data.client.status,
  }));
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const initialValues = {
    [EFields.choice]: tins.choice ?? true,
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
                : Yup.string().required(t('Please enter country')),
            ),
            [EFields.taxNumber]: Yup.lazy(() =>
              !!values[EFields.tins].filter((el) => !!(el?.[EFields.taxCountry] && el?.[EFields.taxNumber])).length
                ? FieldValidators.notRequiredString.max(20, t('Maximum length symbols'))
                : Yup.string().required(t('Please enter Tax Number')).max(20, t('Maximum length symbols')),
            ),
          }),
        ).min(2, t('At least one Tax ID should be added')),
        otherwise: Yup.array().notRequired(),
      }),
    }),
  );

  function Submit(data: FormikValues) {
    const values = { ...data };
    values[EFields.choice] = values.choice.toString();
    values[EFields.tins] = JSON.stringify(
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
                <Col sm={7}>
                  <Radio
                    name={EFields.choice}
                    options={config.haveTinsNumber}
                    disabled={clientStatus.tins_status.code === EClientStatusCode.submitted}
                  />
                </Col>
                <Col xs={12} className="form-breakline mt-10 mb-10" />
              </Row>
              {values[EFields.choice] &&
                values[EFields.tins].map((e: any, i: number) => {
                  const _isFieldDisabled = i < tins.tins.length;
                  return (
                    <div
                      className="d-flex justify-content-between flex-wrap flex-md-nowrap"
                      key={e?.taxCountry?.code + i}
                    >
                      <div className="tax-identification__field-wrap tax-identification__field-wrap--country">
                        <CountrySelect
                          label={t('Country')}
                          name={`${EFields.tins}.${i}.${EFields.taxCountry}`}
                          disabled={_isFieldDisabled}
                        />
                      </div>
                      <div className="tax-identification__field-wrap tax-identification__field-wrap--number">
                        <Input
                          label={t('Tax Identification Number')}
                          name={`${EFields.tins}.${i}.${EFields.taxNumber}`}
                          disabled={_isFieldDisabled}
                        />
                      </div>
                      <Button
                        type="button"
                        className="remove-tins-row"
                        onClick={() => removeTinsRow(i)}
                        disabled={!isTinsRowValid(i) || _isFieldDisabled}
                      >
                        -
                      </Button>
                    </div>
                  );
                })}
              {!values[EFields.choice] && (
                <Row>
                  <Col xs={12}>
                    <Radio
                      className="mb-8"
                      optionClassName="col-12 col-sm-6"
                      name={EFields.reason}
                      options={config.chooseReason}
                      disabled={clientStatus.tins_status.code === EClientStatusCode.submitted}
                    />
                  </Col>
                </Row>
              )}
              <Button type="submit" loadingOnAction={EActionTypes.updateTins} disabled={(clientStatus.tins_status.code === EClientStatusCode.submitted && (!tins.choice || tins.tins.length > 2))}>
                {t('Submit')}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
});
