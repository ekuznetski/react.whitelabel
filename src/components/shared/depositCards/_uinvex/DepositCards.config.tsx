import { Svg } from '../../svg/Svg';
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
      header: <Svg href="secured" height={48} />,
      uid: 2,
      content: (
        <>
          {t('Funds Secured')} <small>{t('In Tier-1 Banks')}</small>
        </>
      ),
    },
    {
      wrapperClassName: 'card col-12 col-md-4 mb-9 mb-md-0',
      header: <Svg href="timer" height={48} />,
      uid: 3,
      content: (
        <>
          {t('Quick')} {t('Processing')}
        </>
      ),
    },
  ],
};
