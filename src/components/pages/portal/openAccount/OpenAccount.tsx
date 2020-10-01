import {
  Button,
  CurrencySelect,
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
import { ETradingAccountType, ETradingPlatform, ETradingType } from '@domain/enums';
import { Form, Formik, FormikProps } from 'formik';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import './OpenAccount.scss';

enum EFields {
  'platform' = 'platform',
  'account_type' = 'account_type',
  'currency' = 'currency',
  'leverage' = 'leverage',
}

export const OpenAccount = memo(function OpenAccount({ routeState }: any) {
  const [isModalSuccessOpen, setModalSuccessOpen] = React.useState(false);
  const [isModalFailureOpen, setModalFailureOpen] = React.useState(false);
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    platform: FieldValidators.requiredString,
    account_type: FieldValidators.requiredString,
    currency: FieldValidators.requiredString,
    leverage: Yup.string().when('platform', {
      is: (val: string) => val === ETradingPlatform.mt4,
      then: FieldValidators.requiredString,
      otherwise: Yup.string().notRequired(),
    }),
  });
  const leverageList = [
    { label: '1:500', value: '500' },
    { label: '1:400', value: '400' },
    { label: '1:300', value: '300' },
    { label: '1:200', value: '200' },
    { label: '1:100', value: '100' },
  ];
  const tradingAccountTypesList = [
    { label: 'Fixed', value: ETradingAccountType.raw },
    { label: 'Classic', value: ETradingAccountType.classic },
    { label: 'Raw', value: ETradingAccountType.raw },
  ];

  return (
    <>
      <Container className="open-account-page-wrapper">
        <Row>
          <Col xs={12}>
            <PageTitle
              title={routeState.accountType === ETradingType.demo ? t('Open Demo Account') : t('Open Live Account')}
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
              onSubmit={(data) => {
                console.log('submit', data);
                let showError = confirm('Call `mt(4|5)accounts/demo/create` API. \n With success?');
                if (showError) setModalSuccessOpen(true);
                else setModalFailureOpen(true);
              }}
            >
              {({ values, setFieldValue }: FormikProps<any>) => {
                if (values.leverage && values.platform === ETradingPlatform.mt4) {
                  setFieldValue(EFields.leverage, '');
                }
                return (
                  <Form className="open-account__form">
                    <Radio
                      className="mb-8"
                      name={EFields.platform}
                      options={[
                        { label: 'MetaTrader 4', value: ETradingPlatform.mt4 },
                        { label: 'MetaTrader 5', value: ETradingPlatform.mt5 },
                      ]}
                    />
                    <Select placeholder="Account Type" options={tradingAccountTypesList} name={EFields.account_type} />
                    {values.platform === ETradingPlatform.mt4 && (
                      <Select placeholder="Leverage" options={leverageList} name={EFields.leverage} />
                    )}
                    <CurrencySelect placeholder="Currency" name={EFields.currency} />
                    <Button type="submit">{t('Submit')}</Button>
                  </Form>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </Container>
      <Modal className="open-account__modal success" isOpen={isModalSuccessOpen} isOpenDispatcher={setModalSuccessOpen}>
        <ModalTitle title={t('Successful Submission')}>
          <small className="mt-1">
            {t('Demo Live trade account with ID')} <b>1000008251</b> {t('added successfully')}
          </small>
        </ModalTitle>
        <ModalContext>
          <Svg href="shrimp.svg" width={100} className="p-7" />
        </ModalContext>
        <ModalNav>
          <Button onClick={() => setModalSuccessOpen(false)}>
            <NavLink to="/dasboard">{t('Continue')}</NavLink>
          </Button>
        </ModalNav>
      </Modal>
      <Modal className="open-account__modal failure" isOpen={isModalFailureOpen} isOpenDispatcher={setModalFailureOpen}>
        <ModalTitle title={t('Unsuccessful Submission')} subTitle={t('Something went wrong. Please try again')} />
        <ModalContext>
          <Svg href="shrimp.svg" width={100} className="p-7" />
        </ModalContext>
        <ModalNav>
          <Button className="red mr-5" onClick={() => setModalFailureOpen(false)}>
            {t('Try Again')}
          </Button>
          <Button className="red noBg mr-5" onClick={() => setModalFailureOpen(false)}>
            <NavLink to="/dasboard">{t('Back to Dashboard')}</NavLink>
          </Button>
        </ModalNav>
      </Modal>
    </>
  );
});
