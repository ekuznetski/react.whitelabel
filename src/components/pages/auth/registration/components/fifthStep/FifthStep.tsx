import { Button, Checkbox } from '@components/shared';
import { ERegSteps } from '@domain/enums';
import { locale } from '@pages/auth/registration';
import { EActionTypes } from '@store';
import { Form, Formik, FormikValues } from 'formik';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import * as Yup from 'yup';

enum EFields {
  'declaration' = 'declaration',
}

export function FifthStep({ name, submitFn }: any) {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    declaration: Yup.bool().oneOf([true], t('This field is required')),
  });

  function Submit(data: FormikValues) {
    submitFn({ [ERegSteps.step5]: data });
  }

  return (
    <div className="registration-fifth-step">
      <Formik
        initialValues={{
          declaration: false,
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
