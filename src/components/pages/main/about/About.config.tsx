import { Img, Svg, Table } from '@components/shared';
import i18n from '@i18next';
import React from 'react';
import { MobileDepositTable } from './components';

const t = i18n.getLazyT;

export const config = {
  tabsData: (responsive: any) => ({
    labels: [
      { value: t('Deposit'), anchor: 'deposit' },
      { value: t('Withdrawals'), anchor: 'withdrawals' },
    ],
    content: [
      {
        value: responsive.md ? (
          <Table {...config.tableData.deposit} />
        ) : (
          <MobileDepositTable {...config.tableData.deposit} />
        ),
        anchor: 'deposit',
      },
      {
        value: responsive.md ? (
          <Table {...config.tableData.withdrawals} />
        ) : (
          <MobileDepositTable {...config.tableData.withdrawals} />
        ),
        anchor: 'withdrawals',
      },
    ],
  }),
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
      colsSize: ['20%', '10%', '30%', null, '10%'],
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
      colsSize: ['20%', '10%', '30%', null, '10%'],
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
      content: t('Offices in financial centres'),
      uid: 1,
    },
    {
      className: 'p-10',
      header: 140,
      content: t('Service provisions'),
      uid: 2,
    },
    {
      className: 'p-10',
      header: 10,
      content: t('Customer support in 10 languages'),
      uid: 3,
    },
  ],
};
