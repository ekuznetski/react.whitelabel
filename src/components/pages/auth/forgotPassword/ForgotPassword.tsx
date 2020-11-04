import { AuthAlreadyRegisteredLink, Button, Input, PageTitle, Svg } from '@components/shared';
import { FieldValidators } from '@domain';
import { Form, Formik, FormikProps } from 'formik';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import './ForgotPassword.scss';
import { useDispatch } from 'react-redux';
import { ac_forgotPassword, ac_userExists } from '@store';
import { usePathLocale } from '@utils/hooks';
import { useHistory } from 'react-router-dom';

enum EFields {
  'email' = 'email',
}

export function ForgotPassword() {
  const dispatch = useDispatch();
  const { localizePath } = usePathLocale();
  const { t } = useTranslation();
  const history = useHistory();
  const [submittedEmail, setSubmittedEmail] = useState<string>('');
  const validationSchema = Yup.object().shape({ [EFields.email]: FieldValidators.email });

  return (
    <Container className="forgot-password">
      <Row>
        <Col sm={12} md={7} lg={5} className="m-auto">
          {!submittedEmail && (
            <>
              <PageTitle title={t('Forgot Password')} description={t('Reset Password Note')} showBackButton={false} />
              <Formik
                initialValues={{ email: '' }}
                validationSchema={validationSchema}
                onSubmit={(data, helpers) => {
                  dispatch(
                    ac_userExists(
                      { username: data.email },
                      () =>
                        dispatch(
                          ac_forgotPassword(
                            data,
                            () => setSubmittedEmail(data[EFields.email]),
                            (e) => console.log(e),
                          ),
                        ),
                      () => helpers.setFieldError(EFields.email, 'User is not exists'),
                    ),
                  );
                }}
              >
                {(props: FormikProps<any>) => (
                  <Form className="m-auto form">
                    <Input label={t('Email/Username')} name={EFields.email} />
                    <Button type="submit">{t('Submit')}</Button>
                  </Form>
                )}
              </Formik>
            </>
          )}
          {submittedEmail && (
            <>
              <PageTitle
                title={t('Successful Submission')}
                description={t('Reset Password Note Success')}
                showBackButton={false}
              />
              <Svg className="d-block m-auto pb-10" href="shrimp" width={20} />
              <div className="text-center pb-10">{submittedEmail}</div>
              <Button
                type="button"
                onClick={() => {
                  history.push(localizePath('/login'));
                }}
              >
                {t('Return to Login Page')}
              </Button>
            </>
          )}
          <AuthAlreadyRegisteredLink />
        </Col>
      </Row>
    </Container>
  );
}
