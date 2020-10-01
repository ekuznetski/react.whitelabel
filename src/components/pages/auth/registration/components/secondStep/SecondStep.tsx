import { ERegSteps } from '@components/pages';
import { Button, Checkbox, CountrySelect, Input, Select } from '@components/shared';
import { FieldValidators } from '@domain';
import { ECountryCodeToName } from '@domain/enums';
import { IDataStore, IStore } from '@store';
import { Form, Formik, FormikValues } from 'formik';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import './SecondStep.scss';

enum EFields {
  'tax_checkbox' = 'tax_checkbox',
  'tax_country' = 'tax_country',
  'country' = 'country',
  'dayOfBirth' = 'dayOfBirth',
  'monthOfBirth' = 'monthOfBirth',
  'yearOfBirth' = 'yearOfBirth',
  'street' = 'street',
  'city' = 'city',
  'zip' = 'zip',
}

export function SecondStep({ submitFn }: any) {
  const { geoIp } = useSelector<IStore, Partial<IDataStore>>((state) => ({
    geoIp: state.data.geoIp,
  }));

  const months = moment
    .localeData('en')
    .months()
    .reduce((acc: any, month, idx) => [...acc, { value: idx + 1, label: month }], []);

  const validationSchema = Yup.object().shape({
    tax_checkbox: FieldValidators.notRequired,
    tax_country: Yup.string().when('tax_checkbox', {
      is: true,
      then: FieldValidators.alphaWithSpaceAndApostropheOnly,
      otherwise: FieldValidators.notRequired,
    }),
    country: FieldValidators.alphaWithSpaceAndApostropheOnly,
    dayOfBirth: FieldValidators.requiredNumber
      .min(1, 'Invalid value')
      .max(31, 'Day must be less or equal to ${max}')
      .when([EFields.monthOfBirth, EFields.yearOfBirth], {
        is: (monthOfBirth, yearOfBirth) => !!monthOfBirth && !!yearOfBirth,
        then: FieldValidators.requiredNumber.min(1, 'Invalid value').test('max', '', function (value) {
          const { path, parent, createError } = this;
          const { monthOfBirth, yearOfBirth } = parent;
          const maxDay = new Date(yearOfBirth, monthOfBirth, 0).getDate();
          if (value && value > maxDay) {
            return createError({
              path,
              message: `Day must be less or equal to ${maxDay}`,
            });
          }
          return true;
        }),
        overwise: FieldValidators.requiredNumber.min(1, 'Invalid value').max(31, 'Day must be less or equal to ${max}'),
      }),
    monthOfBirth: FieldValidators.requiredNumber.min(1, 'Invalid value').max(12, 'Invalid value'),
    yearOfBirth: FieldValidators.requiredNumber
      .min(1920, 'Invalid value')
      .max(new Date().getFullYear(), 'Invalid value'),
    street: FieldValidators.street,
    city: FieldValidators.city,
    zip: FieldValidators.zip,
  });

  function Submit(data: FormikValues) {
    data.country = ECountryCodeToName[data.country];
    if (!data.tax_checkbox) {
      data.tax_country = data.country;
    } else {
      data.tax_country = ECountryCodeToName[data.tax_country];
    }
    Object.assign(data, { dob: `${data.yearOfBirth}-${data.monthOfBirth}-${data.dayOfBirth}` });
    delete data.yearOfBirth;
    delete data.monthOfBirth;
    delete data.dayOfBirth;
    delete data.tax_checkbox;
    submitFn({ [ERegSteps.step2]: data });
  }

  return (
    <div className="registration-second-step">
      <Formik
        initialValues={{
          tax_checkbox: false,
          tax_country: geoIp?.country ?? '',
          country: geoIp?.country ?? '',
          dayOfBirth: '',
          monthOfBirth: '',
          yearOfBirth: '',
          street: '',
          city: '',
          zip: '',
        }}
        validationSchema={validationSchema}
        onSubmit={Submit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form className="m-auto form fadein-row">
              <h4 className="section-title mb-5">Additional Information</h4>
              <Checkbox name={EFields.tax_checkbox}>
                The country in which I reside and pay taxes is the below country.{' '}
              </Checkbox>
              {!!values.tax_checkbox && (
                <CountrySelect className="fadein-row" label="Country of tax" name={EFields.tax_country} />
              )}
              <CountrySelect label="Country of residence" name={EFields.country} />
              <h4 className="section-title mb-5">Date of Birth</h4>
              <div className="dob d-flex">
                <Input
                  label="Day"
                  name={EFields.dayOfBirth}
                  value={values.dayOfBirth}
                  onChange={(e: any) => {
                    e.preventDefault();
                    if (/^\d{0,2}$/gm.test(e.target.value) || e.target.value === '') {
                      setFieldValue(EFields.dayOfBirth, e.target.value);
                    }
                  }}
                />
                <Select className="mx-3" label="Month" options={months} name={EFields.monthOfBirth} />
                <Input
                  label="Year"
                  name={EFields.yearOfBirth}
                  value={values.yearOfBirth}
                  onChange={(e: any) => {
                    if (/^\d{0,4}$/gm.test(e.target.value) || e.target.value === '') {
                      e.preventDefault();
                      setFieldValue(EFields.yearOfBirth, e.target.value);
                    }
                  }}
                />
              </div>
              <h4 className="section-title">Address</h4>
              <Input label="Street name and number" name={EFields.street} />
              <Input label="City" name={EFields.city} />
              <Input label="Postcode (Optional)" name={EFields.zip} />
              <Button type="submit">Next</Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
