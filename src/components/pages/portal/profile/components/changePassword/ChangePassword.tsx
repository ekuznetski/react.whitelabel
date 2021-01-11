import { Button, Input } from '@components/shared';
import { FieldValidators } from '@domain';
import { ENotificationType } from '@domain/enums';
import { EActionTypes, ac_changePassword, ac_showNotification } from '@store';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

enum EFields {
  'currentPassword' = 'currentPassword',
  'newPassword' = 'newPassword',
  'repeatNewPassword' = 'repeatNewPassword',
}

export const ChangePassword = memo(
  forwardRef<HTMLDivElement>(function ChangePassword(props, ref) {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
      currentPassword: FieldValidators.password,
      newPassword: Yup.string().when('currentPassword', {
        is: (val: string) => val?.length > 0,
        then: FieldValidators.password.test('muchOlpPassword', '', function (value) {
          const { path, parent, createError } = this;
          const { currentPassword }: { currentPassword: string } = parent;
          if (value && value === currentPassword) {
            return createError({
              path,
              message: t('Your New Password can`t be the same as your Current Password'),
            });
          }
          return true;
        }),
        otherwise: Yup.string(),
      }),
      repeatNewPassword: Yup.string().when('currentPassword', {
        is: (val: string) => val?.length > 0,
        then: FieldValidators.password.oneOf([Yup.ref('newPassword'), ''], t('Passwords must match')),
        otherwise: Yup.string(),
      }),
    });

    function Submit(data: FormikValues, { resetForm }: FormikHelpers<any>) {
      dispatch(
        ac_changePassword(
          {
            old_password: data[EFields.currentPassword],
            new_password: data[EFields.newPassword],
          },
          () => {
            resetForm();
            dispatch(
              ac_showNotification({
                type: ENotificationType.success,
                message: t('The Password Has Been Updated Successfully'),
              }),
            );
          },
          () =>
            dispatch(
              ac_showNotification({
                type: ENotificationType.danger,
                message: t('Failed To Update The Password'),
              }),
            ),
        ),
      );
    }

    return (
      <div className="change-password">
        <Container className="internal-transfer-page-wrapper">
          <Row className="justify-content-center">
            <Col xs={12} md={9} lg={7} xl={6} className="form-wrapper py-10 px-9">
              <Formik
                initialValues={{
                  currentPassword: '',
                  newPassword: '',
                  repeatNewPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={Submit}
              >
                {(resetForm) => {
                  return (
                    <Form className="internal-transfer__form">
                      <Input
                        label={t('Current Password')}
                        name={EFields.currentPassword}
                        type="password"
                        autoComplete="current-password"
                      />
                      <Input
                        label={t('New Password')}
                        name={EFields.newPassword}
                        type="password"
                        autoComplete="new-password"
                      />
                      <Input
                        label={t('Repeat New Password')}
                        name={EFields.repeatNewPassword}
                        type="password"
                        autoComplete="new-password"
                      />
                      <Button type="submit" loadingOnAction={EActionTypes.changePassword}>
                        {t('Save')}
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }),
);
