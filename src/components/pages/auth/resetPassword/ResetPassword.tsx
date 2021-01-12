import { Button, Input, LocaleLink, PageTitle } from '@components/shared';
import { FieldValidators } from '@domain';
import { ENotificationType } from '@domain/enums';
import { IResetPasswordRequest } from '@domain/interfaces';
import { EActionTypes, ac_login, ac_resetPassword, ac_showNotification } from '@store';
import { useUrlParams } from '@utils/hooks';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

enum EFields {
  'password' = 'password',
  'repeatPassword' = 'repeatPassword',
}

export function ResetPassword() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { token, username } = useUrlParams();

  const validationSchema = Yup.object().shape({
    [EFields.password]: FieldValidators.password,
    [EFields.repeatPassword]: FieldValidators.password.oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  });

  useEffect(() => {
    if (!token || !username) {
      dispatch(
        ac_showNotification({
          type: ENotificationType.danger,
          message: 'Token or Username is missed',
          timeout: null,
        }),
      );
    }
  }, []);

  function submit(data: FormikValues) {
    const preparedData: IResetPasswordRequest = { password: data.password, token, username };

    dispatch(
      ac_resetPassword(
        preparedData,
        (e) => {
          dispatch(
            ac_showNotification({
              type: ENotificationType.success,
              message: 'Password was changed successfully, now you will be redirected to dashboard',
              timeout: 4000,
            }),
          );
          setTimeout(() => {
            dispatch(ac_login({ username, password: preparedData.password }));
          }, 4000);
        },
        (e) => {
          dispatch(
            ac_showNotification({
              type: ENotificationType.danger,
              message: `Reset password failure: ${e.data.response.message}`,
              timeout: null,
            }),
          );
        },
      ),
    );
  }

  return (
    <Container>
      <Row>
        <Col sm={12} md={7} lg={5} className="m-auto">
          <PageTitle title={t('Restore Password')} showBackButton={false} />
          <Formik
            initialStatus={!token || !username ? 'disabled' : ''}
            initialValues={{ password: '', repeatPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={submit}
          >
            {(props: FormikProps<any>) => (
              <Form className="m-auto form">
                <Input label={t('New Password')} name={EFields.password} type="password" />
                <Input label={t('Repeat New Password')} name={EFields.repeatPassword} type="password" />
                <Button type="submit" loadingOnAction={EActionTypes.resetPassword}>
                  {t('Submit')}
                </Button>
              </Form>
            )}
          </Formik>
          <div className="mt-5 text-center auth-under-form">
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
