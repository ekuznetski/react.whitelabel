import { Img, Svg, Table } from '@components/shared';
import i18n from '@i18next';
import React from 'react';
import { config as _config } from '@pages/main/about/About.config';
import { ELabels } from '@domain/enums';

const t = i18n.getLazyT;

export const config = {
  ..._config,
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
  tabsData: (responsive: any) => ({
    labels: [
      { value: t('Deposit'), anchor: 'deposit' },
      { value: t('Withdrawals'), anchor: 'withdrawals' },
    ],
    content: [
      {
        value: <Table {...config.tableData.deposit} />,
        anchor: 'deposit',
      },
      {
        value: <Table {...config.tableData.withdrawals} />,
        anchor: 'withdrawals',
      },
    ],
  }),
  tableData: {
    deposit: {
      headers: [t('Method'), t('Minimum'), t('Currency'), t('Processing'), t('Fees')],
      rows: [
        [<Img src="wiretransfer.svg" height={40} />, '$250', 'USD, EUR, GBP, AED', t('1 to 7 working days'), '$0'],
        [<Img src="visaMastercard.svg" height={40} />, '$20', 'USD, EUR, GBP, RUB, AED, CAD', t('Up to 1 hour'), '$0'],
      ],
      colsPctSize: [20, 10, 30, null, 10],
    },
    withdrawals: {
      headers: [t('Method'), t('Minimum'), t('Currency'), t('Processing'), t('Fees')],
      rows: [
        [<Img src="wiretransfer.svg" height={40} />, '$300', 'USD, EUR, GBP, AED', t('1 working day'), '$0'],
        [<Img src="visaMastercard.svg" height={40} />, '$20', 'USD, EUR, GBP, RUB, AED, CAD', t('1 working day'), '$0'],
      ],
      colsPctSize: [20, 10, 30, null, 10],
    },
  },
};
