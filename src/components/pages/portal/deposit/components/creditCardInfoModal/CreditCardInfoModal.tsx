import { ModalContext, ModalOld, ModalTitle } from '@components/shared';
import { ELabelsName } from '@domain/enums';
import { env } from '@env';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import './CreditCardInfoModal.scss';

interface IBillingDetailsModalProps {
  isModalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreditCardInfoModal({ isModalOpen, setModalOpen }: IBillingDetailsModalProps) {
  const { t } = useTranslation();

  return (
    <ModalOld isOpen={isModalOpen} isOpenDispatcher={setModalOpen} className="credit-card-info-modal">
      <ModalTitle title={t('Additional Information')} />
      <ModalContext>
        <h3>Debit/Credit Card</h3>
        <p>Notes on Deposits and Withdrawals by Debit/Credit Card</p>
        <ul>
          <li>
            Deposits may take up to 24 hours to be credited to the trading account upon a deposit in the Company’s
            designated client accounts. If your deposit has not been credited in your trading account within 24 hours,
            please check for any emails messages from us
          </li>
          <li>We may require further verification of your cards for deposits and withdrawals.</li>
          <li>
            All withdrawal requests must be credited back to the same credit or debit card before other methods can are
            offered.
          </li>
          <li>No processing fees apply on credit/debit card deposits.</li>
        </ul>
        <p>{t('Credit Card Remark')}</p>
        <h3>Uploading Credit/Debit Card copies: General Information</h3>
        <p>
          We are forced to apply security measures designed for the security of both our clients and ourselves in line
          with current recommendations from card providers such as Visa and MasterCard. Following on from the above, we
          are required to obtain copies of any card used for a deposit to ensure that the cardholder is the owner of the
          trading account. Also be advised that we may request card copies before the approval of a withdrawal request.
          If you have lost any of your cards previously used, we will require either:
        </p>
        <ul>
          <li>An old credit card statement that includes both your name and your card number or</li>
          <li>
            Alternatively a written statement from the card issuing bank that confirms you are the card owner but are no
            longer in possession of that card.
          </li>
          <li>
            Please note that, for security purposes before uploading your scanned copy of your Credit or Debit Card, it
            is advised that you leave only the 1st and last 4 digits of your card number visible and cover the CVV
            number on the back of your credit card image.
          </li>
        </ul>
        <h3>Neteller Payments</h3>
        <p>Notes on Deposits and Withdrawals by Neteller online wallet</p>
        <ul>
          {t<string[]>('Credit Card Neteller Payments Notes', { returnObjects: true }).map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      </ModalContext>
    </ModalOld>
  );
}
