import { Svg } from '@components/shared';
import { ELabels } from '@domain/enums';
import i18n from '@i18next';
import React from 'react';

const t = i18n.getLazyT;

export const config = {
  depositCards: [
    {
      wrapperClassName: 'card col-12 col-md-4 mb-9 mb-md-0',
      header: <Svg href="zero_pct" />,
      uid: 1,
      content: (
        <>
          {t('No Deposit Fees')} <small>{t('Fees')}</small>
        </>
      ),
    },
    {
      wrapperClassName: 'card col-12 col-md-4 mb-9 mb-md-0',
      header: <Svg href="funds_secure" />,
      uid: 2,
      content: (
        <>
          {t('Funds Secured')} <small>{t('In Tier-1 Banks')}</small>
        </>
      ),
    },
    {
      wrapperClassName: 'card col-12 col-md-4 mb-9 mb-md-0',
      header: <Svg href="timer" />,
      uid: 3,
      content: (
        <>
          {t('Quick')} <small>{t('Processing')}</small>
        </>
      ),
    },
  ],
};
