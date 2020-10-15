import { Alert, Button, Input, PageTitle, TradingAccountsSelect } from '@components/shared';
import { FieldValidators } from '@domain';
import { EFormStatus, ENotificationType } from '@domain/enums';
import { MClientData, MTradingAccount, MWithdrawalHistoryItem } from '@domain/models';
import { ac_fetchWithdrawLimit, ac_showNotification, ac_withdrawFunds, EActionTypes, IStore } from '@store';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { WithdrawalHistorySection } from './components';
import './Withdrawal.scss';

enum EFields {
  'account' = 'account',
  'amount' = 'amount',
}

interface WithdrawalStoreProps {
  tradingAccounts: MTradingAccount[];
  withdrawalHistoryItems: MWithdrawalHistoryItem[];
  withdrawalLimit: number;
  withdrawalLimitIsLoading: boolean;
  clientData: MClientData;
}

export const Withdrawal = memo(function Withdrawal() {
  const store = useSelector<IStore, WithdrawalStoreProps>((state) => ({
    tradingAccounts: state.data.tradingData?.accounts || [],
    withdrawalHistoryItems: state.data.withdrawals.history || [],
    withdrawalLimit: state.data.withdrawals.limit,
    withdrawalLimitIsLoading: state.app.requests.activeList.includes(EActionTypes.fetchWithdrawLimit),
    clientData: state.data.client.statusData,
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    [EFields.account]: Yup.object().required('This field is required'),
    [EFields.amount]: Yup.number().when('account', {
      is: (val) => !!val,
      then: FieldValidators.requiredNumber
        .test('min', '', function (value) {
          const { path, parent, createError } = this;
          const { account }: { account: MTradingAccount } = parent;
          if (value && value < account.minWithdrawal) {
            return createError({
              path,
              message: t('Validator withdrawal min error', {
                minSum: account.minWithdrawal,
                currency: account.currency,
              }),
            });
          }
          return true;
        })
        .test('max', '', function (value) {
          const { path, parent, createError } = this;
          const { account }: { account: MTradingAccount } = parent;
          const limit = Math.min(store.withdrawalLimit, account.balance);
          if (value && value > limit) {
            return createError({
              path,
              message: t('Validator withdrawal max error', {
                limit: limit,
                currency: account.currency,
              }),
            });
          }
          return true;
        }),
      overwise: Yup.number(),
    }),
  });

  function Submit(data: FormikValues) {
    dispatch(
      ac_withdrawFunds(
        {
          trade_account: data[EFields.account].account_id,
          trade_platform: data[EFields.account].platform,
          amount: data[EFields.account],
        },
        () =>
          dispatch(
            ac_showNotification({
              type: ENotificationType.success,
              context: t('Your Withdraw Request Added Successfully'),
            }),
          ),
      ),
    );
  }

  return (
    <div className="withdrawal-page-wrapper">
      <Container>
        <Row>
          <Col>
            <PageTitle
              sizes={{ xs: 12, md: 10, lg: 8, xl: 7 }}
              title="Withdrawal"
              description={t('HYCM withdrawal policy desc')}
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          {store.clientData?.isNotApprovedAndNotDormant && (
            <Alert sizes={{ xs: 12, md: 9, lg: 7, xl: 6 }} className="mb-7" type="error">
              {t('You cannot transfer at the moment')}
            </Alert>
          )}
          {store.clientData?.isDormant && (
            <Alert sizes={{ xs: 12, md: 9, lg: 7, xl: 6 }} className="mb-7" type="error">
              {t('90 inactive days warning:0')}{' '}
              <a className="a-link" href="mailto:accounts@hycm.com">
                accounts@hycm.com
              </a>{' '}
              {t('90 inactive days warning:1')}
            </Alert>
          )}
          <Col xs={12} md={9} lg={7} xl={6} className="form-wrapper py-10 px-9">
            <Formik
              initialStatus={
                store.tradingAccounts?.length === 0 || !store.clientData.isApproved || store.clientData.isDormant
                  ? EFormStatus.disabled
                  : null
              }
              initialValues={{
                account: '',
                amount: '',
              }}
              isInitialValid={false}
              validationSchema={validationSchema}
              onSubmit={Submit}
            >
              {({ values, setFieldValue }: FormikProps<any>) => {
                return (
                  <Form className="withdrawal__form">
                    <TradingAccountsSelect
                      placeholder={t('Trading Account')}
                      options={store.tradingAccounts}
                      name={EFields.account}
                      onChange={(account: MTradingAccount) => {
                        setFieldValue(EFields.amount, '');
                        dispatch(
                          ac_fetchWithdrawLimit({ accountId: account.accountId, platform: account.platformName }),
                        );
                      }}
                    />
                    <Input
                      label={t('Trading Amount')}
                      name={EFields.amount}
                      disabled={!values.account || store.withdrawalLimitIsLoading}
                      isLoading={store.withdrawalLimitIsLoading}
                      forceShowError={values.amount > 0}
                    />
                    <Button type="submit" loadingOnAction={EActionTypes.withdrawFunds}>
                      {t('Submit')}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Col>
        </Row>
        {store.withdrawalHistoryItems?.length ? (
          <WithdrawalHistorySection items={store.withdrawalHistoryItems} />
        ) : null}
      </Container>
    </div>
  );
});
