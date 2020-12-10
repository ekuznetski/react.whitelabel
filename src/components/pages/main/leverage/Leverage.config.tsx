import { Img, Svg } from '@components/shared';
import i18n from 'i18next';
import React from 'react';

const t = i18n.getFixedT(i18n.language);

export const config = {
  tableData: {
    headers: [t('Asset Class'), ''],
    rows: [
      ['Indices future (eu,jp and hk)', '1:500 (Dynamic)'],
      ['Forex (Major)', '1:100'],
      ['Forex (Major)', '1:100'],
      ['Forex (Major)', '1:100'],
      ['Forex (Major)', '1:100'],
      ['Forex (Major)', '1:100'],
      ['Indices future (eu,jp and hk)', '1:500 (Dynamic)'],
      ['Forex (Major)', '1:100'],
      ['Forex (Major)', '1:100'],
      ['Indices future (eu,jp and hk)', '1:500 (Dynamic)'],
      ['Indices future (eu,jp and hk)', '1:500 (Dynamic)'],
      ['Indices future (eu,jp and hk)', '1:500 (Dynamic)'],
      ['Forex (Major)', '1:100'],
      ['Forex (Major)', '1:100'],
      ['Indices future (eu,jp and hk)', '1:500 (Dynamic)'],
      ['Indices future (eu,jp and hk)', '1:500 (Dynamic)'],
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
