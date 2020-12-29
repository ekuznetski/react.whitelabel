import { ModalContext, ModalOld, ModalTitle } from '@components/shared';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import './NetellerInfoModal.scss';

interface IBillingDetailsModalProps {
  isModalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function NetellerInfoModal({ isModalOpen, setModalOpen }: IBillingDetailsModalProps) {
  const { t } = useTranslation();

  return (
    <ModalOld isOpen={isModalOpen} isOpenDispatcher={setModalOpen} className="netteler-info-modal">
      <ModalTitle title={t('Additional Information')} />
      <ModalContext>
        <h3>Neteller Payments</h3>
        <p>Notes on Deposits and Withdrawals by Neteller online wallet</p>
        <ul>
          <li>Deposits throught Neteller online wallet are instant.</li>
          <li>We may require further verification of your cards for deposits and withdrawals.</li>
          <li>The Neteller account you are sending your deposit from, has to be registered to you.</li>
          <li>
            All withdrawal requests must be credited back to the same Neteller account before other methods can are
            offered.
          </li>
          <li>
            No processing fees apply on deposits from XXX’s side, but there is a set % of commission and exchange rate
            charged by Neteller. For more information, please contact Neteller.
          </li>
        </ul>
        <p>Remark: All transactions will appear on your card statement as “XXX”</p>
      </ModalContext>
    </ModalOld>
  );
}
