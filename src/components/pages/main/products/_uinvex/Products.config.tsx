import i18n from '@i18next';
import React from 'react';
import { Trans } from 'react-i18next';
import { config as _config } from '../Products.config';
import { EAssetClass } from '@domain/enums';
import { assetsCharacteristics } from '@domain';

const t = i18n.getLazyT;

export const config = {
  ..._config,
  pageTopTitle: (
    <Trans i18nKey="Range of Markets">
      <span>Orders</span> executed every day
    </Trans>
  ),
  tableSections: [
    {
      id: EAssetClass.forex,
      title: t('Forex'),
      desc: t('Product Section Forex Desc'),
      tableType: EAssetClass.forex,
      points: [
        <Trans i18nKey="Spreads from # pips" values={{ val: assetsCharacteristics[EAssetClass.forex].spread }}>
          Spreads from <b>0.2</b>
        </Trans>,
        <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[EAssetClass.forex].leverage }}>
          Max. Leverage <b>1:200</b>
        </Trans>,
      ],
    },
    {
      id: EAssetClass.stocks,
      title: t('Stocks'),
      desc: t('Product Section Stocks Desc'),
      tableType: EAssetClass.stocks,
      reversed: true,
      points: [
        <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[EAssetClass.stocks].leverage }}>
          Max. Leverage <b>1:20</b>
        </Trans>,
        <Trans i18nKey="Margins from just #" values={{ val: assetsCharacteristics[EAssetClass.stocks].margins }}>
          Margins from just <b>5%</b>
        </Trans>,
      ],
    },
    {
      id: EAssetClass.indices,
      title: t('Indices'),
      desc: t('Product Section Indices Desc'),
      tableType: EAssetClass.indices,
      points: [
        <>
          <b>25+</b> {t('Most Popular Indices Worldwide')}
        </>,
        <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[EAssetClass.indices].leverage }}>
          Max. Leverage <b>1:200</b>
        </Trans>,
      ],
    },
    {
      id: EAssetClass.commodities,
      title: t('Commodities'),
      desc: t('Product Section Commodities Desc'),
      tableType: EAssetClass.commodities,
      reversed: true,
      points: [
        <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[EAssetClass.commodities].leverage }}>
          Max. Leverage <b>1:133</b>
        </Trans>,
      ],
    },
    {
      id: EAssetClass.crypto,
      title: t('Digital Assets'),
      desc: t('Product Section Digital Assets Desc'),
      tableType: EAssetClass.crypto,
      points: [
        <>
          <b>5</b> {t('Main Cryptocurrencies')}
        </>,
        <>
          <b>60+</b> {t('Cryptocurrencies')}
        </>,
      ],
    },
  ],
};
