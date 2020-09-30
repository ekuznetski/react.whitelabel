import React, { Dispatch, SetStateAction } from 'react';
import { Button, Modal, ModalContext, ModalNav, ModalTitle, Svg } from '@components/shared';

interface IBillingDetailsModalProps {
  isModalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreditCardInfoModal({ isModalOpen, setModalOpen }: IBillingDetailsModalProps) {
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
          Confirm
        </Button>
        <Button className="noBg" onClick={() => setModalOpen(false)}>
          Cancel
        </Button>
      </ModalNav>
    </Modal>
  );
}
