import { Button, Modal, ModalContext, ModalNav, ModalTitle, Svg } from '@components/shared';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

interface IBillingDetailsModalProps {
  isModalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function BillingDetailsModal({ isModalOpen, setModalOpen }: IBillingDetailsModalProps) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isModalOpen} isOpenDispatcher={setModalOpen}>
      <ModalTitle title="Confirmation" subTitle="Please confirm withdrawal cancellation" />
      <ModalContext>
        <Svg href="shrimp.svg" width={100} className="p-7" />
      </ModalContext>
      <ModalNav>
        <Button
          className="mr-5"
          onClick={() => {
            setModalOpen(false);
          }}
        >
          {t('Confirm')}
        </Button>
        <Button className="noBg" onClick={() => setModalOpen(false)}>
          {t('Cancel')}
        </Button>
      </ModalNav>
    </Modal>
  );
}
