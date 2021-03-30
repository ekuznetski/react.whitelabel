import { ModalBody, ModalTitle } from '@components/core';
import { Button, Col, Input, Row } from '@components/shared';
import { FieldValidators } from '@domain';
import { ENotificationType } from '@domain/enums';
import { IChangeAccountPasswordRequest } from '@domain/interfaces';
import { ITradingAccountSingleCard } from '@pages/portal/dashboard/components';
import { EActionTypes, ac_changeAccountPassword, ac_hideModal, ac_showNotification } from '@store';
import { Form, Formik } from 'formik';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

interface IAccountPasswordModalProps {
  tradingAccount: ITradingAccountSingleCard;
}

enum EFields {
  'password' = 'password',
  'confirmPassword' = 'confirmPassword',
}

export const TradingAccountPasswordModal = memo(function TradingAccountPasswordModal({
  tradingAccount,
}: IAccountPasswordModalProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    password: FieldValidators.password,
    confirmPassword: FieldValidators.password.oneOf([Yup.ref('password'), ''], t('Passwords must match')),
  });

  function Submit(data: Omit<IChangeAccountPasswordRequest, 'account'>) {
    const preparedData = { password: data.password, account: tradingAccount.accountId };
    dispatch(
      ac_changeAccountPassword(
        preparedData,
        () => {
          dispatch(ac_hideModal());
          dispatch(
            ac_showNotification({
              type: ENotificationType.success,
              message: t('The Account Has Been Updated'),
            }),
          );
        },
        () => {
          dispatch(ac_hideModal());
          dispatch(
            ac_showNotification({
              type: ENotificationType.danger,
              message: t('Failed To Update Account'),
            }),
          );
        },
      ),
    );
  }

  return (
    <>
      <ModalTitle title={t('Change Password')} className="mb-7" />
      <ModalBody>
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={Submit}
        >
          {() => {
            return (
              <Form className="m-auto form">
                <Row>
                  <Col xs={12} sm={6}>
                    <Input label={t('Password')} name={EFields.password} type="password" />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Input label={t('Confirm password')} name={EFields.confirmPassword} type="password" />
                  </Col>
                </Row>
                <Button type="submit" loadingOnAction={EActionTypes.changeAccountPassword}>
                  {t('Submit')}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </ModalBody>
    </>
  );
});
