import { Svg } from '@components/shared';
import { EPagePath, ETradingType, EWorkshopType } from '@domain/enums';
import { IDashboardConfig } from '@domain/interfaces';
import i18n from '@i18next';
import React from 'react';
import { Trans } from 'react-i18next';
import { TradingAccountCards } from './components';

const t = i18n.getLazyT;

export const config: IDashboardConfig = {
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
    alignNavigation: 'left',
    labels: [
      {
        value: (
          <>
            <Svg href="filter" className="d-none d-md-inline" /> {t('My Trading Accounts')}
          </>
        ),
        anchor: ETradingType.live,
      },
      {
        value: (
          <>
            <Svg href="filter" className="d-none d-md-inline" /> {t('My Demo Accounts')}
          </>
        ),
        anchor: ETradingType.demo,
      },
    ],
    content: [
      { value: <TradingAccountCards type={[ETradingType.live, ETradingType.fake]} />, anchor: ETradingType.live },
      { value: <TradingAccountCards type={[ETradingType.demo]} />, anchor: ETradingType.demo },
    ],
  },
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
      disabled: true,
      bg_img: 'client_banner_1.jpg',
      bg_color: 'white',
      link: { path: '/share', text: t('Invite Now') },
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
      link: { path: EPagePath.Deposit, text: t('Deposit Now') },
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
      bg_img: 'client_banner_2.jpg',
      bg_color: '#eff1f3',
      link: { path: EPagePath.Deposit, text: t('Deposit Now') },
      text: (
        <Trans i18nKey="Promotional Cards Texts:4">
          Fund Your Account with <span>$0 Fees</span>
        </Trans>
      ),
      title: t('Deposit Now').toUpperCase(),
    },
  ],
  profileStatusTemplates: {
    danger: {
      url: EPagePath.Verification,
      status: 'danger',
      icon: 'status_error',
      text: t('Verify your profile'),
    },
    warning: {
      url: null,
      status: 'warning',
      icon: 'status_pending',
      text: t('Profile on review'),
    },
    success: {
      url: null,
      status: 'success',
      icon: 'status_success',
      text: t('Profile approved'),
    },
  },
};
