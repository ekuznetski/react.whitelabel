import { Img, Svg } from '@components/shared';
import i18n from '@i18next';
import React from 'react';

const t = i18n.getLazyT;

export const config = {
  tableData: {
    headers: [t('Asset Class'), ''],
    rows: [
      [t('Forex (Major)'), `1:500 (${t('Dynamic')})`],
      [t('Forex (Minor)'), `1:500 (${t('Dynamic')})`],
      [t('Forex (Exotic)'), '1:100'],
      [t('Cryptocurrency'), '1:20'],
      [t('Metals (Spot And Future)'), '1:100'],
      [t('Indices Cash (US Indices)'), '1:100'],
      [t('Indices Cash (Others)'), '1:50'],
      [t('Indices Future (US Indices)'), '1:100'],
      [t('Indices Future (EU,JP and HK)'), '1:50'],
      [t('Indices Future (India and China)'), '1:33'],
      [t('Commodities (Natgas)'), '1:67'],
      [t('Commodities (US oil and Brent)'), '1:20'],
      [t('Commodities (Soft)'), '1:50'],
      [t('Stocks (France)'), '1:10'],
      [t('Stocks (Germany)'), '1:10'],
      [t('Stocks (Spain)'), '1:10'],
      [t('Stocks (US)'), '1:20'],
      ['Etfs', '1:20'],
    ],
    colsPctSize: [50, 50],
  },
  leverageRatiosCards: [
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
