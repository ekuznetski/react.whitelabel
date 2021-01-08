import { Img, Svg } from '@components/shared';
import i18n from '@i18next';
import React from 'react';

const t = i18n.getLazyT;

export const config = {
  tableData: {
    headers: [t('Asset Class'), ''],
    rows: [
      ['Forex (Major)', '1:500 (Dynamic)'],
      ['Forex (Minor)', '1:500 (Dynamic)'],
      ['Forex (Exotic)', '1:100'],
      ['Cryptocurrency', '1:20'],
      ['Metals (Spot And Future)', '1:100'],
      ['Indices Cash (US Indices)', '1:100'],
      ['Indices Cash (Others)', '1:50'],
      ['Indices Future (US Indices)', '1:100'],
      ['Indices Future (EU,JP and HK)', '1:50'],
      ['Indices Future (India and China)', '1:33'],
      ['Commodities (Natgas)', '1:67'],
      ['Commodities (US oil and Brent)', '1:20'],
      ['Commodities (Soft)', '1:50'],
      ['Stocks (France)', '1:10'],
      ['Stocks (Germany)', '1:10'],
      ['Stocks (Spain)', '1:10'],
      ['Stocks (US)', '1:20'],
      ['Etfs', '1:20'],
    ],
    colsPctSize: [null, null],
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
