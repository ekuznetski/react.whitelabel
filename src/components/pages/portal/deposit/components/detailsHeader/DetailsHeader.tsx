import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { depositActionCreators, DepositContext } from '../../depositContext';
import { Img, Svg } from '@components/shared';
import './DetailsHeader.scss';
import { EDepositMethods } from '@domain/enums';
import classNames from 'classnames';

export function DetailsHeader() {
  const { amount, account, method } = useContext(DepositContext).state;
  const { dispatch } = useContext(DepositContext);
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
                dispatch?.(depositActionCreators.setIsAmountSelected(false));
              }}
            >
              {t('Change amount')}
            </a>
          </div>
        </div>
        {method && method !== EDepositMethods.creditCard && <Svg href={method} width={80} />}
      </div>
    </>
  );
}
