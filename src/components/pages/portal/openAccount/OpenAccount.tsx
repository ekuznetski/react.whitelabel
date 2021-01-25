import { Button, CurrencySelect, PageTitle, Radio, Select } from '@components/shared';
import { FieldValidators } from '@domain';
import { EModalType, ETradingType } from '@domain/enums';
import { ICreateTradingAccountRequest, ICreateTradingAccountResponse } from '@domain/interfaces';
import { EActionTypes, IAppStore, IStore, ac_createTradingAccount, ac_showModal } from '@store';
import { Form, Formik, FormikValues } from 'formik';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { SubmitModal } from '@pages/portal/openAccount/components/submitModal/SubmitModal';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { MClientSettings } from '@domain/models';
import * as Yup from 'yup';
import './OpenAccount.scss';

type modalOptionsProps = { type: EModalType | null; isOpen: boolean; data: ICreateTradingAccountResponse | null };

enum EFields {
  'platform' = 'platform',
  'account_type' = 'account_type',
  'currency' = 'currency',
  'leverage' = 'leverage',
}

export const OpenAccount = memo(function OpenAccount() {
  const { route, clientSettings } = useSelector<IStore, { route: IAppStore['route']; clientSettings: MClientSettings }>(
    (state) => ({
      route: state.app.route,
      clientSettings: state.data.client.settings,
    }),
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    platform: FieldValidators.requiredString,
    account_type: FieldValidators.requiredString,
    currency: FieldValidators.requiredString,
    leverage: FieldValidators.requiredString,
  });
  const leverages = clientSettings.getLeveragesSelectList();
  const tradingAccounts = clientSettings.getTradingAccountTypesSelectList();
  const tradingPlatforms = clientSettings.getPlatformsSelectList();
  const currencies = clientSettings.getCurrenciesSelectList();

  function Submit(data: FormikValues) {
    dispatch(
      ac_createTradingAccount(
        data as ICreateTradingAccountRequest,
        route.state.accountType === ETradingType.demo,
        (accountData) => {
          dispatch(
            ac_showModal(SubmitModal, { type: EModalType.success, data: accountData }, 'open-account__modal success'),
          );
        },
        () => {
          dispatch(ac_showModal(SubmitModal, { type: EModalType.failure }, 'open-account__modal failure'));
        },
      ),
    );
  }

  return (
    <>
      <Container className="open-account-page-wrapper">
        <Row>
          <Col xs={12}>
            <PageTitle
              title={route.state.accountType === ETradingType.demo ? t('Open Demo Account') : t('Open Live Account')}
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={9} lg={7} xl={6} className="form-wrapper py-10 px-9">
            <Formik
              initialValues={{
                platform: tradingPlatforms.length === 1 ? tradingPlatforms[0].value : '',
                account_type: '',
                currency: Object.keys(currencies).length === 1 ? currencies[Object.keys(currencies)[0]].code : '',
                leverage: '',
              }}
              validationSchema={validationSchema}
              onSubmit={Submit}
            >
              {() => {
                return (
                  <Form className="open-account__form">
                    <Radio
                      optionClassName="col-6"
                      className="mb-8"
                      name={EFields.platform}
                      options={tradingPlatforms}
                    />
                    <Select placeholder="Account Type" options={tradingAccounts} name={EFields.account_type} />
                    <Select placeholder="Leverage" options={leverages} name={EFields.leverage} />
                    <CurrencySelect placeholder="Currency" name={EFields.currency} options={currencies} />
                    <Button
                      type="submit"
                      loadingOnAction={[EActionTypes.createLiveTradingAccount, EActionTypes.createDemoTradingAccount]}
                    >
                      {t('Submit')}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
});
