import i18n from '@i18next';
import React from 'react';
import { AffiliateForm, BrokersForm } from './components';

const t = i18n.getLazyT;

export const config = {
  tabsData: {
    labels: [
      { value: t('Affiliate'), anchor: 'affiliate' },
      { value: t('IB'), anchor: 'ib' },
      { value: t('White Label'), anchor: 'whiteLabel' },
    ],
    content: [
      {
        value: <AffiliateForm />,
        anchor: 'affiliate',
      },
      {
        value: <BrokersForm />,
        anchor: 'ib',
      },
      {
        value: <AffiliateForm />,
        anchor: 'whiteLabel',
      },
    ],
  },
};
