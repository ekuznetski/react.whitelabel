import { Img, Svg } from '@components/shared';
import i18n from '@i18next';
import React from 'react';

const t = i18n.getLazyT;

export const config = {
  tableData: {
    deposit: {
      headers: [t('Method'), t('Minimum'), t('Currency'), t('Processing'), t('Fees')],
      rows: [
        [<Img src="bank_wire.png" height={40} />, '$250', 'USD, EUR, GBP, AED', t('1 to 7 working days'), '$0'],
        [<Img src="visa_mastercard.png" height={40} />, '$20', 'USD, EUR, GBP, RUB, AED, CAD', t('Up to 1 hour'), '$0'],
        [<Img src="webmoney.png" height={40} />, '$20', 'USD, EUR', t('Up to 1 hour'), '$0'],
        [<Img src="neteller.png" height={40} />, '$20', 'USD, EUR', t('Up to 1 hour'), '$0'],
        [<Img src="skrill.png" height={40} />, '$20', 'USD, EUR', t('Up to 1 hour'), '$0'],
      ],
      colsPctSize: [20, 10, 30, null, 10],
    },
    withdrawals: {
      headers: [t('Method'), t('Minimum'), t('Currency'), t('Processing'), t('Fees')],
      rows: [
        [<Img src="bank_wire.png" height={40} />, '$300', 'USD, EUR, GBP, AED', t('1 working day'), '$0'],
        [
          <Img src="visa_mastercard.png" height={40} />,
          '$20',
          'USD, EUR, GBP, RUB, AED, CAD',
          t('1 working day'),
          '$0',
        ],
        [<Img src="webmoney.png" height={40} />, '$20', 'USD, EUR', t('1 working day'), '$0'],
        [<Img src="neteller.png" height={40} />, '$20', 'USD, EUR', t('1 working day'), '$0'],
        [<Img src="skrill.png" height={40} />, '$20', 'USD, EUR', t('1 working day'), '$0'],
      ],
      colsPctSize: [20, 10, 30, null, 10],
    },
  },
  trustedCards: [
    {
      header: (
        <>
          130<small>+</small>
        </>
      ),
      content: t('Trading Instruments'),
      uid: 1,
    },
    { header: 6, content: t('Asset Classes'), uid: 2 },
    { header: 0, content: t('Deposit Fees'), uid: 3 },
    {
      header: (
        <>
          12<small>ms</small>
        </>
      ),
      content: t('Avg Execution'),
      uid: 4,
    },
  ],
  inTouchCards: [
    {
      className: 'p-10',
      header: 6,
      content: 'Offices in the world’s leading financial centres',
      uid: 1,
    },
    {
      className: 'p-10',
      header: 140,
      content: 'Service provision in over 140 countries',
      uid: 2,
    },
    {
      className: 'p-10',
      header: 10,
      content: 'Customer support in 10 languages',
      uid: 3,
    },
  ],
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
