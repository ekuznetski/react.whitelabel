import { Button, Input, LocaleLink } from '@components/shared';
import { FieldValidators } from '@domain';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

enum EFields {
  'login' = 'login',
}

export function ForgotPassword() {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({ [EFields.login]: FieldValidators.loginAndEmail });

  return (
    <Container>
      <Row>
        <Col sm={12} md={7} lg={5} className="m-auto">
          <h3 className="text-center mb-7">{t('Forgot Password')}</h3>
          <Formik
            initialValues={{ login: '' }}
            validationSchema={validationSchema}
            onSubmit={(data) => {
              console.log('Login submit', data);
            }}
          >
            {(props: FormikProps<any>) => (
              <Form className="m-auto form">
                <Input label={t('Login')} name={EFields.login} />
                <Button type="submit">{t('Submit')}</Button>
              </Form>
            )}
          </Formik>
          <div className="mt-5 text-center under-form">
            {t('Already Registered?')}
            <LocaleLink className="already__link ml-1" to="/login">
              {t('Sign In')}
            </LocaleLink>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
