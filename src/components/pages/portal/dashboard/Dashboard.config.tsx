import { ITabs, Svg } from '@components/shared';
import { ETradingType, EWorkshopType } from '@domain/enums';
import { AnyFunction, IClientBannerCard } from '@domain/interfaces';
import i18n from 'i18next';
import React from 'react';
import { Trans } from 'react-i18next';
import { TradingAccountCards } from './components';

interface IConfig {
  workshopsData: {
    type: EWorkshopType;
    author: {
      img: string;
      name: string;
      title: string;
    };
    schedule: {
      day: string;
      time: string;
    };
    info: {
      title: string;
      description: string;
    };
  }[];
  tabsData: ITabs;
  promotion_cards: IClientBannerCard[];
  bonus_cards: IClientBannerCard[];
  accountNavItems: {
    id: string;
    icon: string;
    path?: string;
    title: string;
    onClick?: AnyFunction;
  }[];
}

const t = i18n.getFixedT(i18n.language);

export const config: IConfig = {
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
  accountNavItems: [
    {
      id: 'launch',
      icon: 'coins',
      path: '/deposit',
      title: t('Launch MT4 Web'),
    },
    {
      id: 'download',
      icon: 'coins',
      path: '/deposit',
      title: t('Download MT4 Platform'),
    },
    {
      id: 'statement',
      icon: 'coins',
      path: '/deposit',
      title: t('Get Trading Statement'),
    },
    {
      id: 'password',
      icon: 'coins',
      title: t('Change Password'),
    },
  ],
  promotion_cards: [
    {
      type: 'blue',
      disabled: true,
      link: { text: t('Learn more') },
      text: (
        <Trans i18nKey="Promotional Cards Texts:0">
          <span>Earn $20</span> to trade with once you complete your Financial profile and submit your documents
        </Trans>
      ),
    },
    {
      type: 'blue',
      disabled: true,
      link: { text: t('SMS Verification') },
      text: (
        <Trans i18nKey="Promotional Cards Texts:1">
          Get a <span>$20 bonus</span> added to your trading account when you verify your phone number
        </Trans>
      ),
      title: t('Verify Your Phone Number'),
    },
    {
      type: 'blue',
      bg_img: 'client_banner_1.jpg',
      bg_color: 'white',
      link: { path: 'share', text: t('Invite Now') },
      text: (
        <Trans i18nKey="Promotional Cards Texts:2">
          Invite a friend and get <br /> up to <span>$200 Cash Bonus</span>
        </Trans>
      ),
      title: t('Invite friends for a Bonus'),
    },
    {
      type: 'blue',
      bg_img: 'client_banner_2.jpg',
      bg_color: '#eff1f3',
      link: { path: 'deposit', text: t('Deposit Now') },
      text: (
        <Trans i18nKey="Promotional Cards Texts:3">
          Deposit now and <span>receive a 10% bonus</span> up to $5K instantly added to your account
        </Trans>
      ),
      title: t('10 percent Bonus on deposit'),
    },
  ],
  bonus_cards: [
    {
      type: 'blue',
      bg_img: 'fca_logos',
      link: { path: 'deposit', text: t('Deposit Now') },
      text: (
        <Trans i18nKey="Promotional Cards Texts:4">
          Fund Your Account with <span>$0 Fees</span>
        </Trans>
      ),
      title: t('Deposit Now').toUpperCase(),
    },
  ],
};

export default config;
