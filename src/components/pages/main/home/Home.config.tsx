import { assetsCharacteristics } from '@domain';
import { EAssetClass, ELabels, EWorkshopType } from '@domain/enums';
import { IPriceTabItem } from '@domain/interfaces';
import i18n from '@i18next';
import { useLabelView } from '@utils/hooks';
import React from 'react';
import { Trans } from 'react-i18next';

const t = i18n.getLazyT;

interface IConfig {
  priceSectionTabs: IPriceTabItem[];
  tradeProductsCards: {
    title: string;
    icon: string;
    exchange: string;
    sideIcons?: string[];
  }[];
  [k: string]: any;
}

export const config: IConfig = {
  priceSectionTabs: [
    {
      name: t('Forex'),
      icon: 'filter',
      anchor: EAssetClass.forex,
      info: {
        title: `40+ ${t('Forex')}`,
        desc: t('Product Section Forex Desc'),
        points: [
          <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[EAssetClass.forex].leverage }}>
            Max. Leverage <b>1:200</b>
          </Trans>,
        ],
      },
      priceData: [],
    },
    {
      name: t('Stocks'),
      icon: 'graph_bars',
      anchor: EAssetClass.stocks,
      info: {
        title: `40+ ${t('Stocks')}`,
        desc: t('Product Section Stocks Desc'),
        points: [
          <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[EAssetClass.stocks].leverage }}>
            Max. Leverage <b>1:20</b>
          </Trans>,
        ],
      },
      priceData: [],
    },
    {
      name: t('Indices'),
      icon: 'indices',
      anchor: EAssetClass.indices,
      info: {
        title: t('Indices'),
        desc: t('Product Section Indices Desc'),
        points: [
          <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[EAssetClass.indices].leverage }}>
            Max. Leverage <b>1:200</b>
          </Trans>,
        ],
      },
      priceData: [],
    },
    {
      name: t('Commodities'),
      icon: 'commodities',
      anchor: EAssetClass.commodities,
      info: {
        title: t('Commodities'),
        desc: t('Product Section Commodities Desc'),
        points: [
          <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[EAssetClass.commodities].leverage }}>
            Max. Leverage <b>1:133</b>
          </Trans>,
        ],
      },
      priceData: [],
    },
    {
      name: t('Cryptocurrencies'),
      icon: 'crypto',
      anchor: EAssetClass.crypto,
      info: {
        title: t('Cryptocurrencies'),
        desc: t('Product Section Cryptocurrencies Desc'),
        points: [
          <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[EAssetClass.crypto].leverage }}>
            Max. Leverage <b>1:20</b>
          </Trans>,
        ],
      },
      priceData: [],
    },
  ],
  priceSectionChartSettings: {
    width: 180,
    height: 115,
    margin: { top: 40 },
    showAssetIcon: false,
  },
  priceSectionCarousel: {
    showInfo: (responsive: { [key: string]: boolean }) => {
      return responsive.lg;
    },
    slidesPerView: (responsive: { [key: string]: boolean }) => {
      return responsive.md ? 3 : responsive.sm ? 2 : 1;
    },
  },
  takeControlItems: [
    {
      title: 'Trade With The Metatrader 5 Platform',
      desc: 'The Forex Industry Standard',
      img: 'computer.png',
    },
    {
      title: 'Mobile first',
      desc: 'Get Trading Apps',
      img: 'phone.png',
    },
    {
      title: "Don't miss a thing",
      desc: 'Never miss an opportunity',
      img: 'trade_info.png',
    },
  ],
  workshopsData: [
    {
      type: EWorkshopType.webinar,
      author: {
        img: 'avatar-1.jpg',
        name: 'William Bailey',
        title: 'Chief Currency Analyst',
      },
      schedule: {
        day: 'Every Monday',
        time: '12:30 PM – 1:00 PM GMT',
      },
      info: {
        title: 'FX Week Ahead: Live Market Analysis',
        description: 'Get ready for trading',
      },
    },
    {
      type: EWorkshopType.workshop,
      author: {
        img: 'avatar-1.jpg',
        name: 'Mike Hamilton',
        title: 'Chief Currency Analyst',
      },
      schedule: {
        day: 'Every Wednesday',
        time: '12:30 PM – 1:00 PM GMT',
      },
      info: {
        title: 'FX Week Ahead: Live Market Analysis',
        description: 'Our workshops desc',
      },
    },
  ],
  tradeProductsCards: [
    {
      title: 'Forex',
      icon: 'filter',
      exchange: 'EUR/USD, GBP/USD, USD/JPY',
    },
    {
      title: 'Stocks',
      icon: 'graph_bars',
      exchange: 'Apple, Amazon, Facebook',
    },
    {
      title: 'Indices',
      icon: 'indices',
      exchange: 'US500, UK100, Japan225',
    },
    {
      title: 'Cryptocurrencies',
      icon: 'crypto',
      exchange: '',
    },
    {
      title: 'Commodities',
      icon: 'commodities',
      exchange: 'Cocoa, Cotton, Sugar',
    },
    {
      title: 'ETFs',
      icon: 'etfs',
      exchange: 'iShares, ProShares',
    },
  ],
  platformTechnologySection: {},
  mobileTradingSection: {},
};
