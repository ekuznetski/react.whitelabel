import { Button, Checkbox, CountrySelect, Input, Select } from '@components/shared';
import { CustomFieldValidators, FieldValidators, RegexValidators } from '@domain';
import { Country, ECountryName, ERegSteps, countries } from '@domain/enums';
import { IDataStore, IStore } from '@store';
import { Form, Formik, FormikValues } from 'formik';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Col, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import './SecondStep.scss';
import { isMobile, isTablet } from 'react-device-detect';

enum EFields {
  'tax_checkbox' = 'tax_checkbox',
  'tax_country' = 'tax_country',
  'country' = 'country',
  'state' = 'state',
  'dayOfBirth' = 'dayOfBirth',
  'monthOfBirth' = 'monthOfBirth',
  'yearOfBirth' = 'yearOfBirth',
  'street' = 'street',
  'city' = 'city',
  'postcode' = 'postcode',
}

export function SecondStep({ submitFn }: any) {
  const { geoIp } = useSelector<IStore, Partial<IDataStore>>((state) => ({
    geoIp: state.data.geoIp,
  }));
  const { t } = useTranslation();

  const months = moment
    .localeData('en')
    .months()
    .reduce((acc: any, month, idx) => [...acc, { value: idx + 1, label: month }], []);

  const validationSchema = Yup.object().shape({
    tax_checkbox: FieldValidators.notRequiredString,
    tax_country: Yup.string().when('tax_checkbox', {
      is: true,
      then: CustomFieldValidators.country,
      otherwise: FieldValidators.notRequiredString,
    }),
    country: CustomFieldValidators.country,
    dayOfBirth: FieldValidators.requiredNumber
      .min(1, t('Invalid value'))
      .max(31, t('Day Limit'))
      .when([EFields.monthOfBirth, EFields.yearOfBirth], {
        is: (monthOfBirth, yearOfBirth) => !!monthOfBirth && !!yearOfBirth,
        then: FieldValidators.requiredNumber
          .required(t('Please enter day of birth'))
          .min(1, t('Invalid value'))
          .test('max', '', function (value) {
            const { path, parent, createError } = this;
            const { monthOfBirth, yearOfBirth } = parent;
            const maxDay = new Date(yearOfBirth, monthOfBirth, 0).getDate();
            if (value && value > maxDay) {
              return createError({
                path,
                message: t(`Day Limit`).replace('${max}', maxDay.toString()),
              });
            }
            return true;
          }),
        otherwise: FieldValidators.requiredNumber
          .required(t('Please enter day of birth'))
          .min(1, t('Invalid value'))
          .max(31, t('Day Limit')),
      }),
    monthOfBirth: FieldValidators.requiredNumber
      .required(t('Please enter month of birth'))
      .min(1, t('Invalid value'))
      .max(12, 'Invalid value'),
    yearOfBirth: FieldValidators.requiredNumber
      .required(t('Please enter year of birth'))
      .min(1920, t('Invalid value'))
      .test('max', '', function (value) {
        const { path, createError } = this;
        const currentYear = new Date().getFullYear();
        const maxYear = currentYear - 18;
        if (value && value >= currentYear) {
          return createError({
            path,
            message: t('Invalid value'),
          });
        } else if (value && value > maxYear) {
          return createError({
            path,
            message: t('Year Limit'),
          });
        }
        return true;
      }),
    street: FieldValidators.street,
    city: FieldValidators.city,
    postcode: FieldValidators.postcode.when('country', (country: Country, schema: Yup.StringSchema) => {
      if (country?.name === ECountryName['Canada']) {
        return schema.required(t('Please enter postal code'));
      } else {
        return schema;
      }
    }),
  });

  function Submit(data: FormikValues): void {
    data.country = data.country.name;
    if (!data.tax_checkbox) {
      data.tax_country = data.country;
    } else {
      data.tax_country = data.tax_country.name;
    }
    if (data.state) data.state = data.state.code;
    Object.assign(data, { dob: `${data.yearOfBirth}-${data.monthOfBirth}-${data.dayOfBirth}` });
    const unusedKeys: any[] = [EFields.yearOfBirth, EFields.monthOfBirth, EFields.dayOfBirth, EFields.tax_checkbox];
    data = Object.keys(data).reduce((acc, key) => {
      if (!!data[key] && !unusedKeys.includes(key)) {
        Object.assign(acc, { [key]: data[key] });
      }
      return acc;
    }, {});
    submitFn({ [ERegSteps.step2]: data });
  }

  function hasState(country?: Country): boolean {
    return !!country?.states?.length;
  }

  return (
    <div className="registration-second-step">
      <Formik
        initialValues={{
          tax_checkbox: true,
          tax_country: geoIp?.countryCode ? countries.find((el) => el.code === geoIp?.countryCode) : '',
          country: geoIp?.countryCode ? countries.find((el) => el.code === geoIp?.countryCode) : '',
          state: '',
          dayOfBirth: '',
          monthOfBirth: '',
          yearOfBirth: '',
          street: '',
          city: '',
          postcode: '',
        }}
        validationSchema={validationSchema}
        onSubmit={Submit}
      >
        {({ values, setFieldValue, setFieldTouched }) => {
          const _showCountryState = !!values.country && hasState(values.country as Country);
          const postalCodeLabel =
            !!values.country && (values.country as Country).name === ECountryName['Canada']
              ? t('Postal Code')
              : t('Postal Code') + ' ' + t('Optional');

          useEffect(() => {
            setFieldValue('state', '');
            setFieldTouched('state', false);
          }, [values.country]);

          return (
            <Form className="m-auto form">
              <h4 className="section-title mb-5">{t('Additional Information')}</h4>
              <Checkbox name={EFields.tax_checkbox}>{t('The country in which I pay taxes')} </Checkbox>
              {!values.tax_checkbox && (
                <CountrySelect className="fadein-row" label={t('Country of tax')} name={EFields.tax_country} />
              )}
              <Row>
                <Col sm={12} lg={_showCountryState ? 6 : 12}>
                  <CountrySelect label={t('Country of residence')} name={EFields.country} />
                </Col>
                {_showCountryState && (
                  <Col sm={12} lg={6}>
                    <CountrySelect
                      options={(values.country as Country)?.states}
                      label={t('Country State')}
                      name={EFields.state}
                    />
                  </Col>
                )}
              </Row>

              <h4 className="section-title mb-5">{t('Date of Birth')}</h4>
              <div className="dob d-flex">
                <Input label={t('Day')} name={EFields.dayOfBirth} value={values.dayOfBirth} regex={/^\d{0,2}$/gm} />
                <Select className="mx-3" label={t('Month')} options={months} name={EFields.monthOfBirth} />
                <Input label={t('Year')} name={EFields.yearOfBirth} value={values.yearOfBirth} regex={/^\d{0,4}$/gm} />
              </div>
              <h4 className="section-title">{t('Address')}</h4>
              <Input label={t('Street name and number')} name={EFields.street} />
              <Input label={t('City')} name={EFields.city} />
              <Input label={postalCodeLabel} name={EFields.postcode} />
              <Button type="submit">{t('Next')}</Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
