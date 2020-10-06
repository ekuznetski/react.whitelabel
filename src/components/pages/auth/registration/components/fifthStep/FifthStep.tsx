import { Button, Checkbox } from '@components/shared';
import { ERegSteps } from '@domain/enums';
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
    console.log(data);
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
            <Form className="m-auto form fadein-row">
              <h4 className="section-title mb-5">{t('Declaration')}</h4>
              <Checkbox name={EFields.declaration} className="mb-10">
                <Trans i18nKey="Customer introduction agreement">
                  I, {{ name }}, declare that I have carefully read and understood, <a href="#">Customer Agreement</a>,{' '}
                  <a href="#">Terms of Business</a> and all other policies as found here which I fully accept and agree
                  with. I accept I am electronically signing these documents, and that this is a legally binding
                  contractual agreement.
                </Trans>
              </Checkbox>
              <Button type="submit">{t('Submit')}</Button>
              <p className="mt-5 text-center under-form">
                {t('You are now opening an account with')} <span>XXXX</span>
              </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
