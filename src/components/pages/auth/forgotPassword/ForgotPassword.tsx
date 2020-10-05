import { AuthAlreadyRegisteredLink, Button, Input, PageTitle } from '@components/shared';
import { FieldValidators } from '@domain';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import './ForgotPassword.scss';

enum EFields {
  'login' = 'login',
}

export function ForgotPassword() {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({ [EFields.login]: FieldValidators.loginAndEmail });

  return (
    <Container className="forgot-password">
      <Row>
        <Col sm={12} md={7} lg={5} className="m-auto">
          <PageTitle title={t('Forgot Password')} showBackButton={false} />
          <div className="note text-center mt-5 mb-10">
            In order to reset your password, please provide us with your email address
          </div>
          <Formik
            initialValues={{ login: '' }}
            validationSchema={validationSchema}
            onSubmit={(data) => {
              console.log('Forgot Password submit', data);
            }}
          >
            {(props: FormikProps<any>) => (
              <Form className="m-auto form">
                <Input label={t('Email/Username')} name={EFields.login} />
                <Button type="submit">{t('Submit')}</Button>
              </Form>
            )}
          </Formik>
          <AuthAlreadyRegisteredLink />
        </Col>
      </Row>
    </Container>
  );
}
