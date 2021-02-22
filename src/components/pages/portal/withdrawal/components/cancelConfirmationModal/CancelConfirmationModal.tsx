import React from 'react';
import { Button, Svg } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ac_cancelWithdrawal, ac_hideModal, ac_showNotification } from '@store';
import { ModalBody, ModalFooter, ModalTitle } from '@components/core';
import { ENotificationType } from '@domain/enums';

export function WithdrawCancelConfirmationModal(withdrawalId: string) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  function CancelWithdrawal() {
    dispatch(
      ac_cancelWithdrawal(
        { id: withdrawalId },
        () => {
          dispatch(ac_hideModal());
        },
        () => {
          dispatch(ac_hideModal());
          dispatch(
            ac_showNotification({
              type: ENotificationType.danger,
              message: t('Unable to cancel the withdrawal task. Please contact us'),
            }),
          );
        },
      ),
    );
  }

  return (
    <>
      <ModalTitle title={t('Confirmation')} subTitle={t('Please confirm withdrawal cancellation')} />
      <ModalBody className="d-flex justify-content-center">
        <Svg href="cancel-withdrawal-request" width={100} className=" py-13" />
      </ModalBody>
      <ModalFooter>
        <Button className="mr-5" onClick={CancelWithdrawal}>
          {t('Confirm')}
        </Button>
        <Button noBg onClick={() => dispatch(ac_hideModal())}>
          {t('Cancel')}
        </Button>
      </ModalFooter>
    </>
  );
}
