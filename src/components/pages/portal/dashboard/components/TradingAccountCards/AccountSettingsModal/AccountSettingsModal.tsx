import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, CurrencySelect, Radio, Select } from '@components/shared';
import { ITradingAccountSingleCard } from '@pages/portal/dashboard/components/TradingAccountCards/SingleCard/TradingAccountSingleCard';
import * as Yup from 'yup';
import { FieldValidators } from '@domain';
import { Form, Formik } from 'formik';
import { EActionTypes, IStore, ac_changeAccountSettings, ac_hideModal, ac_showNotification } from '@store';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from '@components/shared';
import { MClientSettings } from '@domain/models';
import { IChangeAccountSettingsRequest } from '@domain/interfaces';
import { ENotificationType } from '@domain/enums';
import { ModalBody, ModalTitle } from '@components/core';

interface IAccountSettingsModalProps {
  tradingAccount: ITradingAccountSingleCard;
}

enum EFields {
  'firstdeposit_platform' = 'firstdeposit_platform',
  'account_type' = 'account_type',
  'currency' = 'currency',
  'leverage' = 'leverage',
}
export const AccountSettingsModal = memo(function AccountSettingsModal({ tradingAccount }: IAccountSettingsModalProps) {
  const { clientSettings } = useSelector<IStore, { clientSettings: MClientSettings }>((state) => ({
    clientSettings: state.data.client.settings,
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    firstdeposit_platform: FieldValidators.requiredString,
    account_type: FieldValidators.requiredString,
    currency: FieldValidators.requiredString,
    leverage: FieldValidators.requiredString,
  });

  const tradingAccountsTypes = clientSettings.getTradingAccountTypesSelectList();
  const currencies = clientSettings.getCurrenciesSelectList();
  const leverages = clientSettings.getLeveragesSelectList();
  const platforms = clientSettings.getPlatformsSelectList();

  function isArrBiggerThanOne(arr: any[]) {
    return arr.length > 1;
  }

  function Submit(data: IChangeAccountSettingsRequest) {
    dispatch(
      ac_changeAccountSettings(
        data,
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
      <ModalTitle title={t('Change Account Settings')} className="mb-7" />
      <ModalBody>
        <Formik
          initialValues={{
            firstdeposit_platform: tradingAccount?.platform.toLowerCase() || '',
            account_type: tradingAccount?.tradingAccountType || '',
            currency: tradingAccount?.currency || '',
            leverage: tradingAccount?.leverage || '',
          }}
          validationSchema={validationSchema}
          onSubmit={Submit}
        >
          {() => {
            return (
              <Form className="m-auto form">
                <Row>
                  {isArrBiggerThanOne(platforms) && (
                    <Col xs="12">
                      <h5 className="section-title">{t('Trading Platform')}</h5>
                      <Radio optionClassName="col mb-8" name={EFields.firstdeposit_platform} options={platforms} />
                    </Col>
                  )}
                  {isArrBiggerThanOne(tradingAccountsTypes) && (
                    <Col xs="12">
                      <h5 className="section-title">{t('Account Type')}</h5>
                      <Radio optionClassName="col mb-8" name={EFields.account_type} options={tradingAccountsTypes} />
                    </Col>
                  )}
                  {isArrBiggerThanOne(Object.keys(currencies)) && (
                    <Col xs="12">
                      <h5>{t('Account Currency')}</h5>
                      <CurrencySelect name={EFields.currency} options={currencies} />
                    </Col>
                  )}
                  {isArrBiggerThanOne(leverages) && (
                    <Col xs="12">
                      <h5>{t('Leverage')}</h5>
                      <Select options={leverages} name={EFields.leverage} />
                    </Col>
                  )}
                </Row>
                <Button type="submit" loadingOnAction={EActionTypes.changeAccountSettings}>
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
