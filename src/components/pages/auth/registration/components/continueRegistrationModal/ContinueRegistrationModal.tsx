import React from 'react';
import { ModalBody, ModalFooter, ModalTitle } from '@components/core';
import { Button, Img } from '@components/shared';
import { EActionTypes, ac_hideModal } from '@store';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

interface IContinueRegistrationModalProps {
  setContinueReg: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const ContinueRegistrationModal = React.memo(function ContinueRegistrationModal({
  setContinueReg,
}: IContinueRegistrationModalProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <>
      <ModalTitle title={t('Do you want to continue registration')} />
      <ModalBody className="w-auto my-10 mx-n9">
        <Img src="live-account-bg.jpg" />
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setContinueReg(true);
            dispatch(ac_hideModal());
          }}
          loadingOnAction={[EActionTypes.fetchClientSettings]}
        >
          {t('Yes continue')}
        </Button>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setContinueReg(false);
            dispatch(ac_hideModal());
          }}
          className="mt-4 start-new"
        >
          {t('No start new')}
        </a>
      </ModalFooter>
    </>
  );
});
