import { Svg } from '@components/shared';
import { ELabels } from '@domain/enums';
import i18n from '@i18next';
import React from 'react';

const t = i18n.getLazyT;

export const config = {
  depositCards: [
    {
      wrapperClassName: 'card col-12 col-md-4 mb-9 mb-md-0',
      header: (
        <>
          <span>$</span> 0
        </>
      ),
      uid: 1,
      content: <>{t('No Deposit Fees')}</>,
    },
    {
      wrapperClassName: 'card col-12 col-md-4 mb-9 mb-md-0',
      header: <Svg href="secured" _label={ELabels.uinvex} height={52} width={52} />,
      uid: 2,
      content: (
        <>
          {t('Funds Secured')} <small>{t('In Tier-1 Banks')}</small>
        </>
      ),
    },
    {
      wrapperClassName: 'card col-12 col-md-4 mb-9 mb-md-0',
      header: <Svg href="timer" _label={ELabels.uinvex} height={52} width={52} />,
      uid: 3,
      content: (
        <>
          {t('Quick')} {t('Processing')}
        </>
      ),
    },
  ],
};
