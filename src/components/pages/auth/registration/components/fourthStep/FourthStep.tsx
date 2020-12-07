import { Button, Input, Radio } from '@components/shared';
import { FieldValidators } from '@domain';
import { ERegSteps } from '@domain/enums';
import { Form, Formik, FormikValues } from 'formik';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

enum EFields {
  'uscitizen' = 'uscitizen',
  'pep' = 'pep',
  'password' = 'password',
  'confirmPassword' = 'confirmPassword',
}

export function FourthStep({ submitFn }: any) {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    uscitizen: FieldValidators.requiredString,
    pep: FieldValidators.requiredString,
    password: FieldValidators.password,
    confirmPassword: FieldValidators.password.oneOf([Yup.ref('password'), ''], t('Passwords must match')),
  });

  function Submit(data: FormikValues) {
    data = Object.keys(data).reduce((acc, key) => {
      if (!!data[key] && key !== EFields.confirmPassword) {
        Object.assign(acc, { [key]: data[key] });
      }
      return acc;
    }, {});
    submitFn({ [ERegSteps.step4]: data });
  }

  return (
    <div>
      <Formik
        initialValues={{
          uscitizen: 'no',
          pep: 'no',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={Submit}
      >
        {(props: any) => {
          const { values, setFieldValue } = props;
          return (
            <Form className="m-auto form fadein-row">
              <h4 className="section-title mb-5">{t('Are You a US Reportable Person')}</h4>
              <Radio
                className="mb-10"
                name={EFields.uscitizen}
                options={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                ]}
              />
              <h4 className="section-title mb-5">{t('Are you a Politically Exposed Person')}</h4>
              <Radio
                className="mb-10"
                name={EFields.pep}
                options={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                ]}
              />
              <p>{t('Politically Exposed Person Desc')}</p>
              <h4 className="section-title mb-5">{t('Set a Password')}</h4>
              <Row>
                <Col xs={12} sm={6}>
                  <Input label={t('Password')} name={EFields.password} type="password" />
                </Col>
                <Col xs={12} sm={6}>
                  <Input label={t('Confirm password')} name={EFields.confirmPassword} type="password" />
                </Col>
              </Row>
              <Button type="submit">{t('Next')}</Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
