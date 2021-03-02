import { Svg } from '@components/shared';
import { EDepositMethodCode } from '@domain/enums';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { depositActionCreators, useDepositDispatch, useDepositState } from '../../deposit.context';
import './DetailsHeader.scss';

export function DetailsHeader() {
  const { amount, account, method } = useDepositState();
  const dispatch = useDepositDispatch();
  const { t } = useTranslation();

  return (
    <>
      <div className="details-header d-flex justify-content-between align-items-center mb-5">
        <div>
          <div>{t('Deposit Amount')}</div>
          <div>
            {account?.currencySymbol} {amount}
            <a
              href="#"
              className="ml-7 change-amount"
              onClick={(e) => {
                e.preventDefault();
                dispatch(depositActionCreators.setIsAmountSelected(false));
              }}
            >
              {t('Change amount')}
            </a>
          </div>
        </div>
        {method && method !== EDepositMethodCode.creditCard && <Svg href={method} width={80} />}
      </div>
    </>
  );
}
