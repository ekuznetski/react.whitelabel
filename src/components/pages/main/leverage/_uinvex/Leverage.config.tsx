import { Img, Svg } from '@components/shared';
import i18n from '@i18next';
import React from 'react';
import { config as _config } from '@pages/main/leverage/Leverage.config';
import { Trans } from 'react-i18next';

const t = i18n.getLazyT;

export const config = {
  ..._config,
  tableData: {
    headers: [t('Asset Class'), ''],
    rows: [
      [
        <Trans i18nKey="Forex (Major)">
          <b>Forex</b> (Major)
        </Trans>,
        `1:500 (${t('Dynamic')})`,
      ],
      [
        <Trans i18nKey="Forex (Minor)">
          <b>Forex</b> (Minor)
        </Trans>,
        `1:500 (${t('Dynamic')})`,
      ],
      [
        <Trans i18nKey="Forex (Exotic)">
          <b>Forex</b> (Exotic)
        </Trans>,
        '1:100',
      ],
      [<b>{t('Digital assets')}</b>, '1:20'],
      [
        <Trans i18nKey="Metals (Spot And Future)">
          <b>Metals</b> (Spot And Future)
        </Trans>,
        '1:100',
      ],
      [
        <Trans i18nKey="Indices Cash (US Indices)">
          <b>Indices Cash</b> (US Indices)
        </Trans>,
        '1:100',
      ],
      [
        <Trans i18nKey="Indices Cash (Others)">
          <b>Indices Cash</b> (Others)
        </Trans>,
        '1:50',
      ],
      [
        <Trans i18nKey="Indices Future (US Indices)">
          <b>Indices Future</b> (US Indices)
        </Trans>,
        '1:100',
      ],
      [
        <Trans i18nKey="Indices Future (EU,JP and HK)">
          <b>Indices Future</b> (EU,JP and HK)
        </Trans>,
        '1:50',
      ],
      [
        <Trans i18nKey="Commodities (Natgas)">
          <b>Commodities</b> (Natgas)
        </Trans>,
        '1:67',
      ],
      [
        <Trans i18nKey="Commodities (US oil and Brent)">
          <b>Commodities</b> (US oil and Brent)
        </Trans>,
        '1:20',
      ],
      [
        <Trans i18nKey="Commodities (Soft)">
          <b>Commodities</b> (Soft)
        </Trans>,
        '1:50',
      ],
      [
        <Trans i18nKey="Stocks (France)">
          <b>Stocks</b> (France)
        </Trans>,
        '1:10',
      ],
      [
        <Trans i18nKey="Stocks (Germany)">
          <b>Stocks</b> (Germany)
        </Trans>,
        '1:10',
      ],
      [
        <Trans i18nKey="Stocks (Spain)">
          <b>Stocks</b> (Spain)
        </Trans>,
        '1:10',
      ],
      [
        <Trans i18nKey="Stocks (US)">
          <b>Stocks</b> (US)
        </Trans>,
        '1:20',
      ],
      [<b>{t('Etfs')}</b>, '1:20'],
    ],
    colsSize: [null, null],
  },
};
