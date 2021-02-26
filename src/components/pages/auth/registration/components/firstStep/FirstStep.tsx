import { AuthAlreadyRegisteredLink, Button, Input, PhoneCodeSelect } from '@components/shared';
import { CustomFieldValidators, FieldValidators } from '@domain';
import { countries, ERegSteps } from '@domain/enums';
import { locale as trans } from '@pages/auth/registration';
import { ac_userExists, EActionTypes, IAppStore, IDataStore, IStore } from '@store';
import { getMarketingCookies } from '@utils/services';
import { Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
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
  const { geoIp, locale } = useSelector<IStore, { geoIp: IDataStore['geoIp']; locale: IAppStore['route']['locale'] }>(
    (state) => ({
      geoIp: state.data.geoIp,
      locale: state.app.route.locale,
    }),
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function Submit(data: any, helpers: any) {
    Object.assign(data, { ...getMarketingCookies() });

    dispatch(
      ac_userExists(
        { username: data.email },
        () => helpers.setFieldError(EFields.email, t('Email already in use')),
        () =>
          submitFn({
            [ERegSteps.step1]: {
              ...data,
              phone_prefix: data.phone_prefix.phoneCode,
              phone_country_code: data.phone_prefix.code,
              mobile: 1,
              language: locale,
              country: geoIp?.country ?? 'failed',
              passive_consent: geoIp?.passive_consent ?? 'failed',
              // TODO add campaign_id
            },
          }),
      ),
    );
  }

  const validationSchema = Yup.object().shape({
    first_name: FieldValidators.name,
    surname: FieldValidators.name,
    email: FieldValidators.email,
    phone_prefix: CustomFieldValidators.country,
    phone: FieldValidators.numbers,
  });

  return (
    <div className="registration-first-step">
      <Formik
        initialValues={{
          first_name: '',
          surname: '',
          email: '',
          phone_prefix: geoIp?.countryCode ? countries.find((el) => el.code === geoIp?.countryCode) : '',
          phone: '',
        }}
        validationSchema={validationSchema}
        onSubmit={Submit}
      >
        {(props) => {
          return (
            <Form className="m-auto form">
              <Input className="fadeFromBottom-row__0" label={t('First Name')} name={EFields.first_name} />
              <Input className="fadeFromBottom-row__1" label={t('Last Name')} name={EFields.surname} />
              <Input className="fadeFromBottom-row__2" label={t('Email')} name={EFields.email} />
              <div className="phone-wrapper fadeFromBottom-row__3">
                <PhoneCodeSelect placeholder={t('Prefix')} name={EFields.phone_prefix} />
                <Input label={t('Phone')} name={EFields.phone} regex={/^\d*$/gm} />
              </div>
              {geoIp?.passive_consent && (
                <p className="mb-7 fadeFromBottom-row__4">{trans.marketEventNotificationDesc()}</p>
              )}
              <Button
                type="submit"
                className="fadeFromBottom-row__5"
                loadingOnAction={[EActionTypes.userExists, EActionTypes.fetchClientSettings, EActionTypes.preRegister]}
              >
                {t('Next')}
              </Button>
            </Form>
          );
        }}
      </Formik>
      <AuthAlreadyRegisteredLink className="fadeFromBottom-row__6" />
    </div>
  );
}
