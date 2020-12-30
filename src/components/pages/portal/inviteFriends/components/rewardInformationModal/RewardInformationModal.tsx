import React from 'react';
import { ModalBody, ModalFooter, ModalTitle } from '@components/core';
import { Button, Img, Svg } from '@components/shared';
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
      <ModalBody className="my-10">
        <Svg href="gift-successfull" />
        <p>{t('Reward Information Desc')}</p>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(ac_hideModal());
          }}
        >
          {t('Read Terms and Conditions')}
        </Button>
      </ModalFooter>
    </>
  );
});
