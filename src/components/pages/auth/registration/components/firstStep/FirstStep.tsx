import { AuthAlreadyRegisteredLink, Button, Input, PhoneCodeSelect } from '@components/shared';
import { CustomFieldValidators, FieldValidators, files } from '@domain';
import { ERegSteps, countries } from '@domain/enums';
import { EActionTypes, IStore, ac_userExists } from '@store';
import { getMarketingCookies } from '@utils/services';
import { Form, Formik } from 'formik';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
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
  const { geoIp, locale } = useSelector<IStore, any>((state) => ({
    geoIp: state.data.geoIp,
    locale: state.app.route.locale,
  }));
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
              passive_consent: geoIp?.passive_consent ?? 'failed'
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
                <p className="mb-7 fadeFromBottom-row__4">
                <Trans i18nKey="Market Event Notification Desc">
                  To improve your trading experience, we would like to notify you of market events and extreme price
                  movements. By signing up, you also declare you read, understood, and accept our
                  <a target="_blank" href={files.privacyPolicy}>
                    Privacy Policy
                  </a>
                  and you consent to receive newsletters, special offers and be contacted by WHITE_LABEL representatives
                  via phone or e-mail. You can opt-out any time you wish to.
                </Trans>
              </p>
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
