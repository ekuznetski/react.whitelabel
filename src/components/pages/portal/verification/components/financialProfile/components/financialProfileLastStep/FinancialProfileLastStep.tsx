import { Button, Checkbox } from '@components/shared';
import { AnyFunction } from '@domain/interfaces';
import { Form, Formik } from 'formik';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { EActionTypes } from '@store';

interface FinancialProfileStepProps {
  submitFn: AnyFunction;
}

export const FinancialProfileLastStep = memo(function FinancialProfileStep({ submitFn }: FinancialProfileStepProps) {
  const { t } = useTranslation();

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ agreement: false }}
      validationSchema={Yup.object().shape({
        agreement: Yup.bool().oneOf([true], t('This field is required')),
      })}
      onSubmit={(data) => {
        submitFn?.(data);
      }}
    >
      {(props) => {
        console.log(props);
        return (
          <>
            <div className="financial-profile__step-title mb-10">{t('Declarations and Acknowledgement of Risks')}</div>
            <ul>
              {t<string[]>('Financial Profile Last Stem Declaration Terms', { returnObjects: true }).map(
                (sentence, s) => (
                  <li className="mb-5" key={s}>
                    {sentence}
                  </li>
                ),
              )}
            </ul>
            <Form className="m-auto form">
              <Checkbox name="agreement" className="mb-10">
                {t('Financial Profile Agree with Declaration')}
              </Checkbox>
              <Button
                type="submit"
                loadingOnAction={[EActionTypes.submitFinancialProfile, EActionTypes.fetchClientData]}
              >
                {t('Submit')}
              </Button>
            </Form>
          </>
        );
      }}
    </Formik>
  );
});
