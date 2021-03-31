import { Img, Table } from '@components/shared';
import i18n from '@i18next';
import { config as _config } from '@pages/main/about/About.config';
import React from 'react';
import { MobileDepositTable } from '../components';

const t = i18n.getLazyT;

export const config = {
  ..._config,
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
      headers: [t('Method'), t('Minimum'), t('Processing'), t('Fees')],
      rows: [
        [<Img src="bank_wire.png" height={40} />, '$250', t('1 to 7 working days'), '$0'],
        [<Img src="visa_mastercard.png" height={40} />, '$20', t('Up to 1 hour'), '$0'],
      ],
      colsSize: ['20%', '20%', null, '20%'],
    },
    withdrawals: {
      headers: [t('Method'), t('Minimum'), t('Processing'), t('Fees')],
      rows: [
        [<Img src="bank_wire.png" height={40} />, '$300', t('1 working day'), '$0'],
        [<Img src="visa_mastercard.png" height={40} />, '$20', t('1 working day'), '$0'],
      ],
      colsSize: ['20%', '20%', null, '20%'],
    },
  },
  trustedCards: [
    {
      header: (
        <>
          300<small>+</small>
        </>
      ),
      content: t('Instruments'),
      uid: 1,
    },
    ..._config.trustedCards.filter((card) => card.uid !== 1),
  ],
};
