import { Button, Input } from '@components/shared';
import { FieldValidators } from '@domain';
import { Form, Formik, FormikProps } from 'formik';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

enum EFields {
  'currentPassword' = 'currentPassword',
  'newPassword' = 'newPassword',
  'repeatNewPassword' = 'repeatNewPassword',
}

export const ChangePassword = memo(
  forwardRef<HTMLDivElement>(function ChangePassword(props, ref) {
    const validationSchema = Yup.object().shape({
      currentPassword: FieldValidators.password,
      newPassword: Yup.string().when('currentPassword', {
        is: (val: string) => val?.length > 0,
        then: FieldValidators.password,
        otherwise: Yup.string(),
      }),
      repeatNewPassword: Yup.string().when('currentPassword', {
        is: (val: string) => val?.length > 0,
        then: FieldValidators.password.oneOf([Yup.ref('newPassword'), ''], 'Passwords must match'),
        otherwise: Yup.string(),
      }),
    });

    const { t } = useTranslation();

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
                onSubmit={() => alert('Call `clients/changePassword` API.')}
              >
                {({ values }: FormikProps<any>) => {
                  return (
                    <Form className="internal-transfer__form">
                      <Input
                        label="Current Password"
                        name={EFields.currentPassword}
                        type="password"
                        autoComplete="current-password"
                      />
                      <Input
                        label="New Password"
                        name={EFields.newPassword}
                        type="password"
                        autoComplete="new-password"
                      />
                      <Input
                        label="Repeat New Password"
                        name={EFields.repeatNewPassword}
                        type="password"
                        autoComplete="new-password"
                      />
                      <Button type="submit">{t('Save')}</Button>
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
