import { AuthAlreadyRegisteredLink, Button, Input, PageTitle, Svg } from '@components/shared';
import { FieldValidators } from '@domain';
import { EActionTypes, ac_forgotPassword, ac_showNotification, ac_userExists } from '@store';
import { usePathLocale } from '@utils/hooks';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { ENotificationType } from '@domain/enums';
import './ForgotPassword.scss';

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

  function Submit(data: { email: string }, helpers: FormikHelpers<any>) {
    dispatch(
      ac_userExists(
        { username: data.email },
        () =>
          dispatch(
            ac_forgotPassword(
              data,
              () => setSubmittedEmail(data[EFields.email]),
              () =>
                dispatch(
                  ac_showNotification({
                    type: ENotificationType.danger,
                    message: 'Server error, please contact administrator...',
                  }),
                ),
            ),
          ),
        () => helpers.setFieldError(EFields.email, t('User is not exists')),
      ),
    );
  }

  return (
    <Container className="forgot-password">
      <Row>
        <Col sm={12} md={7} lg={5} className="m-auto">
          {!submittedEmail && (
            <>
              <PageTitle title={t('Forgot Password')} description={t('Reset Password Note')} showBackButton={false} />
              <Formik initialValues={{ email: '' }} validationSchema={validationSchema} onSubmit={Submit}>
                {() => (
                  <Form className="m-auto form">
                    <Input label={t('Email/Username')} name={EFields.email} />
                    <Button type="submit" loadingOnAction={EActionTypes.forgotPassword}>
                      {t('Submit')}
                    </Button>
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
