import { EAssetClass } from '@domain/enums';
import i18n from '@i18next';
import React from 'react';
import { Trans } from 'react-i18next';
import { assetsCharacteristics } from '@domain';
import { ITableSection } from './components';

interface IConfig {
  headerNavigation: { label: string; anchor: EAssetClass }[];
  tableSections: ITableSection[];
}

const t = i18n.getLazyT;

export const config: IConfig = {
  headerNavigation: [
    { label: t('Forex'), anchor: EAssetClass.forex },
    { label: t('Stocks'), anchor: EAssetClass.stocks },
    { label: t('Indices'), anchor: EAssetClass.indices },
    { label: t('Cryptocurrencies'), anchor: EAssetClass.crypto },
    { label: t('Commodities'), anchor: EAssetClass.commodities },
    { label: t('ETFs'), anchor: EAssetClass.etfs },
  ],
  tableSections: [
    {
      id: EAssetClass.forex,
      title: t('Forex'),
      desc: t('Product Section Forex Desc'),
      tableType: EAssetClass.forex,
      points: [
        <Trans i18nKey="Spreads from #" values={{ val: assetsCharacteristics[EAssetClass.forex].spread }}>
          Spreads from <b>0.2</b>
        </Trans>,
        <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[EAssetClass.forex].leverage }}>
          Max. Leverage <b>1:200</b>
        </Trans>,
        <Trans i18nKey="Margins from just #" values={{ val: assetsCharacteristics[EAssetClass.forex].margins }}>
          Margins from just <b>0.50%</b>
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
          <b>15+</b> {t('Most Popular Indices Worldwide')}
        </>,
        <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[EAssetClass.indices].leverage }}>
          Max. Leverage <b>1:200</b>
        </Trans>,
      ],
    },
    {
      id: EAssetClass.crypto,
      title: t('Cryptocurrencies'),
      desc: t('Product Section Cryptocurrencies Desc'),
      tableType: EAssetClass.crypto,
      reversed: true,
      points: [
        <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[EAssetClass.crypto].leverage }}>
          Max. Leverage <b>1:20</b>
        </Trans>,
        <>
          <b>5</b> {t('Main Cryptocurrencies')}
        </>,
      ],
    },
    {
      id: EAssetClass.commodities,
      title: t('Commodities'),
      desc: t('Product Section Commodities Desc'),
      tableType: EAssetClass.commodities,
      points: [
        <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[EAssetClass.commodities].leverage }}>
          Max. Leverage <b>1:133</b>
        </Trans>,
      ],
    },
    {
      id: EAssetClass.etfs,
      title: t('ETFs'),
      desc: t('Product Section ETFs Desc'),
      tableType: EAssetClass.etfs,
      reversed: true,
      points: [
        <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[EAssetClass.etfs].leverage }}>
          Max. Leverage <b>1:20</b>
        </Trans>,
      ],
    },
  ],
};
