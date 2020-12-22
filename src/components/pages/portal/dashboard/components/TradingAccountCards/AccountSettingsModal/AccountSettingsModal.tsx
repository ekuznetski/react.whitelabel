import React, { Dispatch, SetStateAction, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, CurrencySelect, Modal, ModalContext, Radio, Select } from '@components/shared';
import { ITradingAccountSingleCard } from '@pages/portal/dashboard/components/TradingAccountCards/SingleCard/TradingAccountSingleCard';
import * as Yup from 'yup';
import { FieldValidators } from '@domain';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import { IStore } from '@store';
import { EAccountLeverage, ECurrencyCode, ETradingAccountType, ETradingPlatform } from '@domain/enums';
import { useDispatch, useSelector } from 'react-redux';
import { useTradingAccountsState } from '@pages/portal/dashboard/components/TradingAccountCards/trading-accounts.context';
import { Col, Row } from 'react-bootstrap';
import { MClientSettings } from '@domain/models';
import './AccountSettingsModal.scss';

interface IAccountSettingsModalProps {
  isModalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  card: ITradingAccountSingleCard;
}

enum EFields {
  'firstdeposit_platform' = 'firstdeposit_platform',
  'account_type' = 'account_type',
  'currency' = 'currency',
  'leverage' = 'leverage',
}

const ChangePasswordForm = memo(function ChangePasswordForm() {
  const { clientSettings } = useSelector<IStore, { clientSettings: MClientSettings }>((state) => ({
    clientSettings: state.data.client.settings,
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { CardUnderDropdown } = useTradingAccountsState();

  const validationSchema = Yup.object().shape({
    firstdeposit_platform: FieldValidators.requiredString,
    account_type: FieldValidators.requiredString,
    currency: FieldValidators.requiredString,
    leverage: FieldValidators.requiredString,
  });

  const tradingAccounts = clientSettings.getTradingAccountTypesSelectList();
  const currencies = clientSettings.getCurrenciesSelectList();
  const leverages = clientSettings.getLeveragesSelectList();
  const platforms = clientSettings.getPlatformsSelectList();

  function Submit(data: FormikValues) {
    // dispatch(
    //     ac_editProfile(
    //         data as IEditProfileRequest,
    //         () =>
    //             dispatch(
    //                 ac_showNotification({
    //                   type: ENotificationType.success,
    //                   context: t('The Profile Has Been Updated'),
    //                 }),
    //             ),
    //         () =>
    //             dispatch(
    //                 ac_showNotification({
    //                   type: ENotificationType.failure,
    //                   context: t('Failed To Update Client Profile'),
    //                 }),
    //             ),
    //     ),
    // );
  }
  console.log(EAccountLeverage);
  return (
    <Formik
      initialValues={{
        firstdeposit_platform: CardUnderDropdown?.platform.toLowerCase() || '',
        account_type: CardUnderDropdown?.tradingAccountType || '',
        currency: CardUnderDropdown?.currency || '',
        leverage: '200',
      }}
      validationSchema={validationSchema}
      onSubmit={Submit}
    >
      {({ values, setFieldValue }: FormikProps<any>) => {
        return (
          <Form className="m-auto form">
            <Row>
              <Col>
                <h5 className="section-title">{t('Trading Platform')}</h5>
                <Radio optionClassName="col mb-8" name={EFields.firstdeposit_platform} options={platforms} />
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 className="section-title">{t('Account Type')}</h5>
                <Radio optionClassName="col mb-8" name={EFields.account_type} options={tradingAccounts} />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6}>
                <h5 className="select-title">{t('Account Currency')}</h5>
                <CurrencySelect name={EFields.currency} options={currencies} />
              </Col>
              <Col xs={12} sm={6}>
                <h5 className="select-title">{t('Leverage')}</h5>
                <Select options={leverages} name={EFields.leverage} />
              </Col>
            </Row>
            <Button type="submit">{t('Next')}</Button>
          </Form>
        );
      }}
    </Formik>
  );
});

export const AccountSettingsModal = memo(function AccountSettingsModal({
  isModalOpen,
  setModalOpen,
  card,
}: IAccountSettingsModalProps) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isModalOpen} isOpenDispatcher={setModalOpen} className="account-settings-modal">
      <ModalContext>
        <ChangePasswordForm />
      </ModalContext>
    </Modal>
  );
});
