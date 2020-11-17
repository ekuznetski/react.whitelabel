import { EWorkshopType } from '@domain/enums';
import i18n from 'i18next';

const t = i18n.getFixedT(i18n.language);

export const config = {
  takeControlItems: [
    {
      title: t('Trade With The Metatrader 5 Platform'),
      desc: t('The Forex Industry Standard'),
      img: 'computer.png',
    },
    {
      title: 'Mobile first',
      desc: t('Get Trading Apps'),
      img: 'phone.png',
    },
    {
      title: t('Don’t miss a thing'),
      desc: t('Never miss an opportunity'),
      img: 'trade_info.png',
    },
  ],
  workshopsData: [
    {
      type: EWorkshopType.webinar,
      author: {
        img: 'avatar-1.jpg',
        name: 'William Bailey',
        title: t('Chief Currency Analyst'),
      },
      schedule: {
        day: t('Every Monday'),
        time: '12:30 PM – 1:00 PM GMT',
      },
      info: {
        title: 'FX Week Ahead: Live Market Analysis',
        description: t('Get ready for trading'),
      },
    },
    {
      type: EWorkshopType.workshop,
      author: {
        img: 'avatar-1.jpg',
        name: 'Mike Hamilton',
        title: t('Chief Currency Analyst'),
      },
      schedule: {
        day: t('Every Wednesday'),
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
