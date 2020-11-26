import { Svg } from '@components/shared';
import { ETradingType, EWorkshopType } from '@domain/enums';
import i18n from 'i18next';
import React from 'react';
import { TradingAccountCards } from './components';

const t = i18n.getFixedT(i18n.language);

export const config = {
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
        day: 'Every Wednesday',
        time: '12:30 PM – 1:00 PM GMT',
      },
      info: {
        title: 'FX Week Ahead: Live Market Analysis',
        description: t('Our workshops desc'),
      },
    },
  ],
  tabsData: {
    labels: [
      {
        value: (
          <>
            <Svg href="filter" className="mr-2" /> {t('My Trading Accounts')}
          </>
        ),
        anchor: 'tradingAccounts',
      },
      {
        value: (
          <>
            <Svg href="filter" className="mr-2" /> {t('My Demo Accounts')}
          </>
        ),
        anchor: 'demoAccounts',
      },
    ],
    content: [
      { value: <TradingAccountCards type={ETradingType.live} />, anchor: 'tradingAccounts' },
      { value: <TradingAccountCards type={ETradingType.demo} />, anchor: 'demoAccounts' },
    ],
  },
};

export default config;
