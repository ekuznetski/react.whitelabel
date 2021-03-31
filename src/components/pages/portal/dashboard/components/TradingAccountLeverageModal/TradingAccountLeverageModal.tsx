import { ModalBody, ModalTitle } from '@components/core';
import { Button, Col, Row, Select } from '@components/shared';
import { FieldValidators } from '@domain';
import { ENotificationType } from '@domain/enums';
import { MClientSettings } from '@domain/models';
import { ITradingAccountSingleCard } from '@pages/portal/dashboard/components';
import { EActionTypes, IStore, ac_changeAccountLeverage, ac_hideModal, ac_showNotification } from '@store';
import { Form, Formik, FormikValues } from 'formik';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

interface IAccountLeverageModalProps {
  tradingAccount: ITradingAccountSingleCard;
}

enum EFields {
  'leverage' = 'leverage',
}

export const TradingAccountLeverageModal = memo(function TradingAccountLeverageModal({
  tradingAccount,
}: IAccountLeverageModalProps) {
  const { clientSettings } = useSelector<IStore, { clientSettings: MClientSettings }>((state) => ({
    clientSettings: state.data.client.settings,
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    leverage: FieldValidators.requiredString,
  });

  const leverages = clientSettings
    .getLeveragesSelectList()
    .filter((leverage) => leverage.value !== tradingAccount.leverage);

  function isArrBiggerThanOne(arr: any[]) {
    return arr.length > 1;
  }

  function Submit(data: FormikValues) {
    dispatch(
      ac_changeAccountLeverage(
        {
          trade_account: tradingAccount.accountId,
          trade_platform: tradingAccount.platform,
          leverage: data.leverage,
        },
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
      <ModalTitle title={t('Change Leverage')} className="mb-7" />
      <ModalBody>
        <Formik
          initialValues={{
            leverage: leverages[0].value || '',
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
                <Button type="submit" loadingOnAction={EActionTypes.changeAccountLeverage}>
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
