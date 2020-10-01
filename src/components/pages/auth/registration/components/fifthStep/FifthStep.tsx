import { ERegSteps } from '@components/pages';
import { Button, Checkbox } from '@components/shared';
import { Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

enum EFields {
  'declaration' = 'declaration',
}

export function FifthStep({ name, submitFn }: any) {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    declaration: Yup.bool().oneOf([true], 'This field is required'),
  });

  return (
    <div className="registration-fifth-step">
      <Formik
        initialValues={{
          declaration: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          console.log(data);
          submitFn({ [ERegSteps.step5]: data });
        }}
      >
        {(props: any) => {
          return (
            <Form className="m-auto form fadein-row">
              <h4 className="section-title mb-5">{t('Declaration')}</h4>
              <Checkbox name={EFields.declaration} className="mb-10">
                {t('Customer introduction agreement:0')}, {name}, {t('Customer introduction agreement:1')}{' '}
                <a href="#">{t('Customer introduction agreement:2')}</a>,{' '}
                <a href="#">{t('Customer introduction agreement:3')}</a>, <a href="#">{t('Privacy Policy')}</a>{' '}
                {t('Customer introduction agreement:4')}
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
