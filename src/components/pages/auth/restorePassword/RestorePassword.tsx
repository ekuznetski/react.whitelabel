import { Button, Input, LocaleLink, PageTitle } from '@components/shared';
import { FieldValidators } from '@domain';
import { Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

enum EFields {
  'newPassword' = 'newPassword',
  'repeatPassword' = 'repeatPassword',
}

export function RestorePassword() {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    [EFields.newPassword]: FieldValidators.password,
    [EFields.repeatPassword]: FieldValidators.password.oneOf([Yup.ref('newPassword'), ''], 'Passwords must match'),
  });

  return (
    <Container>
      <Row>
        <Col sm={12} md={7} lg={5} className="m-auto">
          <PageTitle title={t('Restore Password')} showBackButton={false} />
          <Formik
            initialValues={{ password: '' }}
            validationSchema={validationSchema}
            onSubmit={(data) => {
              console.log('Login submit', data);
            }}
          >
            {(props: FormikProps<any>) => (
              <Form className="m-auto form">
                <Input label={t('New Password')} name={EFields.newPassword} type="password" />
                <Input label={t('Repeat New Password')} name={EFields.repeatPassword} type="password" />
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
