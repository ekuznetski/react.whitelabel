import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Select } from '@components/shared';
import { ITradingAccountSingleCard } from '@pages/portal/dashboard/components/TradingAccountCards/SingleCard/TradingAccountSingleCard';
import * as Yup from 'yup';
import { FieldValidators } from '@domain';
import { Form, Formik, FormikValues } from 'formik';
import { IStore, ac_changeAccountLeverage, ac_hideModal, ac_showNotification } from '@store';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { MClientSettings } from '@domain/models';
import { ENotificationType } from '@domain/enums';
import { ModalBody, ModalTitle } from '@components/core';

interface IAccountLeverageModalProps {
  tradingAccount: ITradingAccountSingleCard;
}

enum EFields {
  'leverage' = 'leverage',
}

export const AccountLeverageModal = memo(function AccountLeverageModal({ tradingAccount }: IAccountLeverageModalProps) {
  const { clientSettings } = useSelector<IStore, { clientSettings: MClientSettings }>((state) => ({
    clientSettings: state.data.client.settings,
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    leverage: FieldValidators.requiredString,
  });

  const leverages = clientSettings.getLeveragesSelectList();

  function isArrBiggerThanOne(arr: any[]) {
    return arr.length > 1;
  }

  function Submit(data: FormikValues) {
    console.log(tradingAccount);
    const preparedData = {
      trade_account: tradingAccount.accountId,
      leverage: data.leverage,
      trade_platform: tradingAccount.platform,
    };
    dispatch(
      ac_changeAccountLeverage(
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
      <ModalTitle title={t('Change Leverage')} />
      <ModalBody>
        <Formik
          initialValues={{
            leverage: tradingAccount?.leverage || '',
          }}
          validationSchema={validationSchema}
          onSubmit={Submit}
        >
          {() => {
            return (
              <Form className="m-auto form">
                <Row>
                  {isArrBiggerThanOne(leverages) && (
                    <Col xs="12">
                      <Select options={leverages} name={EFields.leverage} />
                    </Col>
                  )}
                </Row>
                <Button type="submit">{t('Submit')}</Button>
              </Form>
            );
          }}
        </Formik>
      </ModalBody>
    </>
  );
});
