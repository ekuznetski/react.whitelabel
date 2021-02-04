import React from 'react';
import { Button, Svg } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ac_hideModal } from '@store';
import { ModalBody, ModalFooter, ModalTitle } from '@components/core';

export function WithdrawCancelConfirmationModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <>
      <ModalTitle title={t('Confirmation')} subTitle={t('Please confirm withdrawal cancellation')} />
      <ModalBody>
        <Svg href="cancel-withdrawal-request-icon" width={100} className="p-7" />
      </ModalBody>
      <ModalFooter>
        <Button
          className="mr-5"
          onClick={() => {
            alert('Call `withdrawals/cancel` API.');
            dispatch(ac_hideModal());
          }}
        >
          {t('Confirm')}
        </Button>
        <Button noBg onClick={() => dispatch(ac_hideModal())}>
          {t('Cancel')}
        </Button>
      </ModalFooter>
    </>
  );
}
