import { ERegSteps } from '@components/pages';
import { Button, Input, PhoneCodeSelect } from '@components/shared';
import { FieldValidators } from '@domain';
import { ac_userExists, IStore } from '@store';
import { usePathLocale } from '@utils/hooks';
import { Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import './FirstStep.scss';

enum EFields {
  'first_name' = 'first_name',
  'surname' = 'surname',
  'email' = 'email',
  'phone_prefix' = 'phone_prefix',
  'phone' = 'phone',
}

export function FirstStep({ submitFn }: any) {
  const { geoIp } = useSelector<IStore, any>((state) => ({
    geoIp: state.data.geoIp,
  }));
  const dispatch = useDispatch();
  const { localizePath } = usePathLocale();
  const { t } = useTranslation();

  function Submit(data: any, helpers: any) {
    dispatch(
      ac_userExists(
        { username: data.email },
        () => helpers.setFieldError(EFields.email, 'Email already in use'),
        () =>
          submitFn({
            [ERegSteps.step1]: {
              ...data,
              mobile: 1,
              language: 'en',
              promotion: 'registration10',
              country: geoIp?.country ?? 'failed',
            },
          }),
      ),
    );
  }

  const validationSchema = Yup.object().shape({
    first_name: FieldValidators.name,
    surname: FieldValidators.name,
    email: FieldValidators.email,
    phone_prefix: FieldValidators.numbers,
    phone: FieldValidators.numbers,
  });

  return (
    <div className="registration-first-step">
      <Formik
        initialValues={{
          first_name: '',
          surname: '',
          email: '',
          phone_prefix: geoIp?.phonePrefix ?? '',
          phone: '',
        }}
        validationSchema={validationSchema}
        onSubmit={Submit}
      >
        {({ setFieldValue }) => {
          return (
            <Form className="m-auto form">
              <Input className="fadeFromBottom-row__0" label={t('First Name')} name={EFields.first_name} />
              <Input className="fadeFromBottom-row__1" label={t('Last Name')} name={EFields.surname} />
              <Input className="fadeFromBottom-row__2" label={t('Email')} name={EFields.email} />
              <div className="phone-wrapper fadeFromBottom-row__3">
                <PhoneCodeSelect
                  placeholder={t('Prefix')}
                  name={EFields.phone_prefix}
                  preselectedValue={geoIp?.countryCode}
                />
                <Input
                  label={t('Phone')}
                  name={EFields.phone}
                  onChange={(e: any) => {
                    if (/^\d*$/gm.test(e.target?.value) || e.target?.value === '') {
                      e.preventDefault();
                      setFieldValue(EFields.phone, e.target.value);
                    }
                  }}
                />
              </div>
              <p className="my-7 fadeFromBottom-row__4">
                {t('Market Event Notification Desc:0')}
                <a href="#">{t('Privacy Policy')}</a>
                {t('Market Event Notification Desc:1')}
              </p>
              <Button type="submit" className="fadeFromBottom-row__5">
                {t('Next')}
              </Button>
              <div className="mt-5 text-center under-form fadeFromBottom-row__6">
                {t('Already Registered')}
                <Link className="already__link ml-1" to={localizePath(`/login`)}>
                  {t('Sign In')}
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
