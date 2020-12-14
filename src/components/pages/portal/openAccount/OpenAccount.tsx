import {
  Button,
  CurrencySelect,
  LocaleNavLink,
  Modal,
  ModalContext,
  ModalNav,
  ModalTitle,
  PageTitle,
  Radio,
  Select,
  Svg,
} from '@components/shared';
import { FieldValidators } from '@domain';
import { EModalType, ETradingType } from '@domain/enums';
import { ICreateTradingAccountRequest, ICreateTradingAccountResponse } from '@domain/interfaces';
import { EActionTypes, IAppStore, IStore, ac_createTradingAccount } from '@store';
import { Form, Formik, FormikValues } from 'formik';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
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

  const [modalOptions, setModalOptions] = React.useState<modalOptionsProps>({
    type: null,
    isOpen: false,
    data: null,
  });
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

  function closeModal(type: EModalType) {
    return (isOpen: boolean) => setModalOptions({ type, isOpen, data: null });
  }

  function Submit(data: FormikValues) {
    dispatch(
      ac_createTradingAccount(
        data as ICreateTradingAccountRequest,
        route.state.accountType === ETradingType.demo,
        (accountData) => setModalOptions({ type: EModalType.success, isOpen: true, data: accountData }),
        () => setModalOptions({ type: EModalType.failure, isOpen: true, data: null }),
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
                platform: '',
                account_type: '',
                currency: '',
                leverage: '',
              }}
              validationSchema={validationSchema}
              onSubmit={Submit}
            >
              {() => {
                return (
                  <Form className="open-account__form">
                    <Radio className="mb-8" name={EFields.platform} options={tradingPlatforms} />
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
      {modalOptions.type === EModalType.success && (
        <Modal
          className="open-account__modal success"
          isOpen={modalOptions.isOpen}
          isOpenDispatcher={closeModal(EModalType.success)}
        >
          <ModalTitle title={t('Successful Submission')}>
            <small className="mt-1">
              {t('Demo Live trade account with ID')} <b>{modalOptions.data?.trade_account_id}</b>{' '}
              {t('added successfully')}
            </small>
          </ModalTitle>
          <ModalContext>
            <Svg href="shrimp" width={100} className="p-7" />
          </ModalContext>
          <ModalNav>
            <Button className="col-12 col-md-8 mx-auto" onClick={() => closeModal(EModalType.success)(false)}>
              <LocaleNavLink to="/dashboard">{t('Continue')}</LocaleNavLink>
            </Button>
          </ModalNav>
        </Modal>
      )}
      {modalOptions.type === EModalType.failure && (
        <Modal
          className="open-account__modal failure"
          isOpen={modalOptions.isOpen}
          isOpenDispatcher={closeModal(EModalType.failure)}
        >
          <ModalTitle title={t('Unsuccessful Submission')} subTitle={t('A Similar Trade Account Already Exists')} />
          <ModalContext>
            <Svg href="shrimp" width={100} className="p-7" />
          </ModalContext>
          <ModalNav>
            <Button className="red mr-5" onClick={() => closeModal(EModalType.failure)(false)}>
              {t('Try Again')}
            </Button>
            <Button className="red mr-5" noBg onClick={() => closeModal(EModalType.failure)(false)}>
              <LocaleNavLink to="/dashboard">{t('Back to Dashboard')}</LocaleNavLink>
            </Button>
          </ModalNav>
        </Modal>
      )}
    </>
  );
});
