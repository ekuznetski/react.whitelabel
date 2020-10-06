import { Button, Input, LocaleLink, PageTitle } from '@components/shared';
import { env, FieldValidators } from '@domain';
import { ELabelsName } from '@domain/enums';
import { ILoginRequest } from '@domain/interfaces';
import { ac_login } from '@store';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import './Login.scss';

enum EFields {
  'username' = 'username',
  'password' = 'password',
}

export function Login() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    [EFields.username]: FieldValidators.loginAndEmail,
    [EFields.password]: FieldValidators.requiredString,
  });

  function Submit(data: FormikValues) {
    dispatch(ac_login(data as ILoginRequest));
  }

  return (
    <Container>
      <Row>
        <Col sm={12} md={7} lg={5} className="m-auto">
          <PageTitle
            title={t('Log in to', { labelName: ELabelsName[env.LABEL?.toLowerCase() as keyof typeof ELabelsName] })}
            showBackButton={false}
          />
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={Submit}
          >
            {(props: FormikProps<any>) => (
              <Form className="m-auto form">
                <Input label={t('Email/Username')} name={EFields.username} />
                <Input label={t('Password')} type="password" name={EFields.password} />
                <Button type="submit">{t('Submit')}</Button>
              </Form>
            )}
          </Formik>
          <div className="mt-5 text-center d-flex align-items-center justify-content-between forgot-create">
            <LocaleLink to="/forgot-password">{t('Restore password')}</LocaleLink>
            <LocaleLink to="/registration">{t('Create Live Account')}</LocaleLink>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
