import { MarketType } from '@domain/enums';
import i18n from 'i18next';
import React from 'react';
import { Trans } from 'react-i18next';
import { marketDescData } from '@domain';
import { ITableSection } from './components';

interface IConfig {
  headerNavigation: { label: string; anchor: MarketType }[];
  tableSections: ITableSection[];
}

const t = i18n.getFixedT(i18n.language);

export const config: IConfig = {
  headerNavigation: [
    { label: t('Forex'), anchor: MarketType.forex },
    { label: t('Stocks'), anchor: MarketType.stocks },
    { label: t('Indices'), anchor: MarketType.indices },
    { label: t('Cryptocurrencies'), anchor: MarketType.crypto },
    { label: t('Commodities'), anchor: MarketType.commodities },
    { label: t('ETFs'), anchor: MarketType.etfs },
  ],
  tableSections: [
    {
      id: MarketType.forex,
      title: t('Forex'),
      desc: t('Product Section Forex Desc'),
      tableType: MarketType.forex,
      points: [
        <Trans i18nKey="Spreads from #" values={{ val: marketDescData[MarketType.forex].spread }}>
          Spreads from <b>{marketDescData[MarketType.forex].spread}</b>
        </Trans>,
        <Trans i18nKey="Max Leverage #" values={{ val: marketDescData[MarketType.forex].leverage }}>
          Max. Leverage <b>{marketDescData[MarketType.forex].leverage}</b>
        </Trans>,
        <Trans i18nKey="Margins from just #" values={{ val: marketDescData[MarketType.forex].margins }}>
          Margins from just <b>{marketDescData[MarketType.forex].margins}</b>
        </Trans>,
      ],
    },
    {
      id: MarketType.stocks,
      title: t('Stocks'),
      desc: t('Product Section Stocks Desc'),
      tableType: MarketType.stocks,
      reversed: true,
      points: [
        <Trans i18nKey="Max Leverage #" values={{ val: marketDescData[MarketType.stocks].leverage }}>
          Max. Leverage <b>{marketDescData[MarketType.stocks].leverage}</b>
        </Trans>,
        <Trans i18nKey="Margins from just #" values={{ val: marketDescData[MarketType.stocks].margins }}>
          Margins from just <b>{marketDescData[MarketType.stocks].margins}</b>
        </Trans>,
      ],
    },
    {
      id: MarketType.indices,
      title: t('Indices'),
      desc: t('Product Section Indices Desc'),
      tableType: MarketType.indices,
      points: [
        <>
          <b>15+</b> {t('Most Popular Indices Worldwide')}
        </>,
        <Trans i18nKey="Max Leverage #" values={{ val: marketDescData[MarketType.indices].leverage }}>
          Max. Leverage <b>{marketDescData[MarketType.indices].leverage}</b>
        </Trans>,
      ],
    },
    {
      id: MarketType.crypto,
      title: t('Cryptocurrencies'),
      desc: t('Product Section Cryptocurrencies Desc'),
      tableType: MarketType.crypto,
      reversed: true,
      points: [
        <Trans i18nKey="Max Leverage #" values={{ val: marketDescData[MarketType.crypto].leverage }}>
          Max. Leverage <b>{marketDescData[MarketType.crypto].leverage}</b>
        </Trans>,
        <>
          <b>5</b> {t('Main Cryptocurrencies')}
        </>,
      ],
    },
    {
      id: MarketType.commodities,
      title: t('Commodities'),
      desc: t('Product Section Commodities Desc'),
      tableType: MarketType.commodities,
      points: [
        <Trans i18nKey="Max Leverage #" values={{ val: marketDescData[MarketType.commodities].leverage }}>
          Max. Leverage <b>{marketDescData[MarketType.commodities].leverage}</b>
        </Trans>,
      ],
    },
    {
      id: MarketType.etfs,
      title: t('ETFs'),
      desc: t('Product Section ETFs Desc'),
      tableType: MarketType.etfs,
      reversed: true,
      points: [
        <Trans i18nKey="Max Leverage #" values={{ val: marketDescData[MarketType.etfs].leverage }}>
          Max. Leverage <b>{marketDescData[MarketType.etfs].leverage}</b>
        </Trans>,
      ],
    },
  ],
};
