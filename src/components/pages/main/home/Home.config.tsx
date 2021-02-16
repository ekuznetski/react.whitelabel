import { assetsCharacteristics } from '@domain';
import { EWorkshopType, MarketType } from '@domain/enums';
import { IPriceTabItem } from '@domain/interfaces';
import i18n from '@i18next';
import React from 'react';
import { Trans } from 'react-i18next';

const t = i18n.getLazyT;

interface IConfig {
  initPriceTabs: IPriceTabItem[];
  tradeProductsCards: {
    title: string;
    icon: string;
    exchange: string;
  }[];
  [k: string]: any;
}

export const config: IConfig = {
  initPriceTabs: [
    {
      name: t('Forex'),
      icon: 'filter',
      anchor: MarketType.forex,
      info: {
        title: `40+ ${t('Forex')}`,
        desc: t('Product Section Forex Desc'),
        points: [
          <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[MarketType.forex].leverage }}>
            Max. Leverage <b>1:200</b>
          </Trans>,
        ],
      },
      priceData: [],
    },
    {
      name: t('Stocks'),
      icon: 'graph_bars',
      anchor: MarketType.stocks,
      info: {
        title: `40+ ${t('Stocks')}`,
        desc: t('Product Section Stocks Desc'),
        points: [
          <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[MarketType.stocks].leverage }}>
            Max. Leverage <b>1:20</b>
          </Trans>,
        ],
      },
      priceData: [],
    },
    {
      name: t('Indices'),
      icon: 'indices',
      anchor: MarketType.indices,
      info: {
        title: t('Indices'),
        desc: t('Product Section Indices Desc'),
        points: [
          <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[MarketType.indices].leverage }}>
            Max. Leverage <b>1:200</b>
          </Trans>,
        ],
      },
      priceData: [],
    },
    {
      name: t('Commodities'),
      icon: 'commodities',
      anchor: MarketType.commodities,
      info: {
        title: t('Commodities'),
        desc: t('Product Section Commodities Desc'),
        points: [
          <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[MarketType.commodities].leverage }}>
            Max. Leverage <b>1:133</b>
          </Trans>,
        ],
      },
      priceData: [],
    },
    {
      name: t('Cryptocurrencies'),
      icon: 'crypto',
      anchor: MarketType.crypto,
      info: {
        title: t('Cryptocurrencies'),
        desc: t('Product Section Cryptocurrencies Desc'),
        points: [
          <Trans i18nKey="Max Leverage #" values={{ val: assetsCharacteristics[MarketType.crypto].leverage }}>
            Max. Leverage <b>1:20</b>
          </Trans>,
        ],
      },
      priceData: [],
    },
  ],
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
};
