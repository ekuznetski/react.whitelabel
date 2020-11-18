import React, { memo } from 'react';
import { FieldValidators } from '@domain';
import { Form, Formik } from 'formik';
import { AnyFunction } from '@domain/interfaces';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox } from '@components/shared';
import * as Yup from 'yup';

export const FinancialProfileLastStep = memo(function FinancialProfileStep({ submitFn }: { submitFn: AnyFunction }) {
  const { t } = useTranslation();
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ agreement: '' }}
      validationSchema={Yup.object().shape({
        agreement: FieldValidators.requiredString,
      })}
      onSubmit={(data) => {
        submitFn?.(data);
      }}
    >
      {() => {
        return (
          <>
            <div className="step-title">Declarations and Acknowledgement of Risks</div>
            <br />
            <ul>
              <li>
                I understand that the nature of my transactions with HYCM will be buying and selling only CFD products
                in various underlying assets.
              </li>
              <li>
                I am aware that by not submitting the KYC documents as requested by the Company may lead to the
                suspension of my trading rights
              </li>
              <li>
                I am aware that the products offered by HYCM are leverage CFD products which carry a high level of risk,
                and it is possible to lose all my capital deposited with HYCM. I further acknowledge that I have read
                the Risk Disclosure Notice as available online.
              </li>
              <li>I have reviewed my answers and responded as accurately as possible.</li>
            </ul>
            <Form className="m-auto form">
              <Checkbox name="agreement">
                {t('By clicking this tick box, I agree to each of the above declarations')}
              </Checkbox>
              <Button type="submit">{t('Submit')}</Button>
            </Form>
          </>
        );
      }}
    </Formik>
  );
});
