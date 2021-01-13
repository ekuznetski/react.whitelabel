import React from 'react';
import { ModalBody, ModalFooter, ModalTitle } from '@components/core';
import { Button, Svg } from '@components/shared';
import { ac_hideModal } from '@store';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import './RewardInformationModal.scss';

export const RewardInformationModal = React.memo(function RewardInformationModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <>
      <ModalTitle title={t('Minimum Requirements')} />
      <ModalBody className="mt-10 mb-12">
        <Svg href="gift-successful" className="mb-7" />
        {t('Reward Information Desc')}
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => dispatch(ac_hideModal())}>{t('Read Terms and Conditions')}</Button>
      </ModalFooter>
    </>
  );
});
