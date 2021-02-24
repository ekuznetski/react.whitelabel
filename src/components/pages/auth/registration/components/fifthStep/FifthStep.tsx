import { Button, Checkbox } from '@components/shared';
import { files } from '@domain';
import { ERegSteps } from '@domain/enums';
import { locale } from '@pages/auth/registration';
import { EActionTypes, IDataStore, IStore } from '@store';
import { Form, Formik, FormikValues } from 'formik';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

enum EFields {
  'declaration' = 'declaration',
  'want_receive_email' = 'want_receive_email',
}

export function FifthStep({ name, submitFn }: any) {
  const { geoIp } = useSelector<IStore, Partial<IDataStore>>((state) => ({
    geoIp: state.data.geoIp,
  }));
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    declaration: Yup.bool().oneOf([true], t('This field is required')),
    want_receive_email: Yup.bool(),
  });

  function Submit(data: FormikValues) {
    submitFn({ [ERegSteps.step5]: data });
  }

  return (
    <div className="registration-fifth-step">
      <Formik
        initialValues={{
          declaration: false,
          want_receive_email: false,
        }}
        validationSchema={validationSchema}
        onSubmit={Submit}
      >
        {() => {
          return (
            <Form className="m-auto form">
              <h4 className="section-title mb-5">{t('Declaration')}</h4>
              <Checkbox name={EFields.declaration} className="mb-10">
                {locale.customerIntroductionAgreement(name)}
              </Checkbox>
              {!geoIp?.passive_consent && (
                <Checkbox name={EFields.want_receive_email} className="mb-10">
                  <Trans i18nKey="Market Event Notification Desc">
                    To improve your trading experience, we would like to notify you of market events and extreme price
                    movements. By signing up, you also declare you read, understood, and accept our
                    <a target="_blank" href={files.privacyPolicy}>
                      Privacy Policy
                    </a>
                    and you consent to receive newsletters, special offers and be contacted by WHITE_LABEL representatives
                    via phone or e-mail. You can opt-out any time you wish to.
                  </Trans>
                </Checkbox>
              )}
              <Button type="submit" loadingOnAction={[EActionTypes.login, EActionTypes.register]}>
                {t('Submit')}
              </Button>
              <p className="mt-5 text-center auth-under-form">
                <Trans i18nKey="You opening account with">
                  You are now opening an account with <span>label_name</span>
                </Trans>
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
