import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { depositActionCreators, DepositContext } from '../../depositContext';

export function DetailsHeader() {
  const { amount } = useContext(DepositContext).state;
  const { dispatch } = useContext(DepositContext);
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>{amount}</div>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          dispatch?.(depositActionCreators.setIsAmountSelected(false));
        }}
      >
        {t('Change amount')}
      </a>
      <div>logo</div>
    </div>
  );
}
