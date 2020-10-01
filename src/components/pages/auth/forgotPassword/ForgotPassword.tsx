import { Button, Input } from '@components/shared';
import { FieldValidators } from '@domain';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export function ForgotPassword() {
  enum EFields {
    'login' = 'login',
  }

  const validationSchema = Yup.object().shape({ [EFields.login]: FieldValidators.loginAndEmail });
  const { t } = useTranslation();

  return (
    <Container>
      <Row>
        <Col sm={12} md={7} lg={5} className="m-auto">
          <h3 className="text-center mb-7">{t('Forgot Password')}</h3>
          <Formik
            initialValues={Object.keys(EFields).reduce((acc, key) => Object.assign(acc, { [key]: '' }), {})}
            validationSchema={validationSchema}
            onSubmit={(data) => {
              console.log('Login submit', data);
            }}
          >
            {(props: FormikProps<any>) => (
              <Form className="m-auto form">
                <Input label="Login" name={EFields.login} />
                <Button type="submit">{t('Submit')}</Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
