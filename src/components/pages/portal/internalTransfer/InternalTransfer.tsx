import { Alert, Button, Input, PageTitle, TradingAccountsSelect } from '@components/shared';
import { FieldValidators } from '@domain';
import { EFormStatus, ENotificationType, ETradingType } from '@domain/enums';
import { IInternalTransferRequestData } from '@domain/interfaces';
import { MClientStatus, MTradingAccount } from '@domain/models';
import { EActionTypes, IStore, ac_makeInternalTransfer, ac_showNotification } from '@store';
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from 'formik';
import React, { memo } from 'react';
import { Col, Container, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import './InternalTransfer.scss';

enum EFields {
  'accountFrom' = 'accountFrom',
  'accountTo' = 'accountTo',
  'amount' = 'amount',
}

interface InternalTransferStoreProps {
  tradingAccounts: MTradingAccount[];
  clientStatus: MClientStatus;
}

export const InternalTransfer = memo(function InternalTransfer() {
  const { tradingAccounts, clientStatus } = useSelector<IStore, InternalTransferStoreProps>((state) => ({
    tradingAccounts: state.data.tradingData.live,
    clientStatus: state.data.client.status,
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    accountFrom: Yup.object().required('This field is required'),
    accountTo: Yup.object().when('accountFrom', {
      is: (val: MTradingAccount) => !!val,
      then: Yup.object().required('This field is required'),
      otherwise: Yup.object().notRequired(),
    }),
    amount: Yup.number().when('accountFrom', {
      is: (val: MTradingAccount) => !!val,
      then: FieldValidators.requiredNumber.test('compareBalance', '', function (value) {
        const { path, parent, createError } = this;
        const { accountFrom }: { accountFrom: MTradingAccount } = parent;
        if (value && value > accountFrom.balance) {
          return createError({
            path,
            message: t('Validator amount error', {
              from: accountFrom.balance,
              currency: accountFrom.currency,
            }),
          });
        }
        return true;
      }),
      otherwise: Yup.number().notRequired(),
    }),
  });
  const formInitialValues = {
    accountFrom: '',
    accountTo: '',
    amount: '',
  };

  function Submit(values: FormikValues, formikHelpers: FormikHelpers<any>) {
    const _data: IInternalTransferRequestData = {
      fromAccount: values.accountFrom.accountId,
      fromPlatform: values.accountFrom.platform,
      toAccount: values.accountTo.accountId,
      toPlatform: values.accountTo.platform,
      amount: parseFloat(values.amount),
    };

    dispatch(
      ac_makeInternalTransfer(
        _data,
        () => {
          dispatch(
            ac_showNotification({
              type: ENotificationType.success,
              message: t('Success'),
            }),
          );
          formikHelpers.resetForm({
            values: formInitialValues,
          });
        },
        () =>
          dispatch(
            ac_showNotification({
              type: ENotificationType.danger,
              message: t('Error'),
            }),
          ),
      ),
    );
  }

  return (
    <Container className="internal-transfer-page-wrapper">
      <Row>
        <Col xs={12}>
          <PageTitle title={t('Internal Transfer')} />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          {tradingAccounts?.length <= 1 && (
            <Alert sizes={{ xs: 12, md: 9, lg: 7, xl: 6 }} className="mb-7" type="error">
              {t('Two live accounts required')}
            </Alert>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Col xs={12} md={9} lg={7} xl={6} className="form-wrapper py-8 px-6 py-md-10 px-md-9">
            <Formik
              initialStatus={
                tradingAccounts?.length <= 1 || !clientStatus.isApproved // Client should have a least two trading accounts
                  ? EFormStatus.disabled
                  : null
              }
              initialValues={formInitialValues}
              validationSchema={validationSchema}
              validateOnMount={false}
              onSubmit={Submit}
            >
              {({ values }: FormikProps<any>) => {
                return (
                  <Form className="internal-transfer__form">
                    <TradingAccountsSelect
                      placeholder={t('Account From')}
                      options={tradingAccounts}
                      name={EFields.accountFrom}
                    />
                    <TradingAccountsSelect
                      placeholder={t('Account To')}
                      options={tradingAccounts.filter(
                        (account) =>
                          account.currency === values?.accountFrom?.currency &&
                          account.accountId !== values?.accountFrom?.accountId,
                      )}
                      name={EFields.accountTo}
                      disabled={!values?.accountFrom}
                    />
                    <Input
                      label={t('Amount')}
                      name={EFields.amount}
                      disabled={!values?.accountFrom}
                      forceShowError={values.amount > 0}
                    />
                    <Button type="submit" checkFormValidity={true} loadingOnAction={EActionTypes.makeInternalTransfer}>
                      {t('Submit')}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Col>
        </Col>
      </Row>
    </Container>
  );
});
