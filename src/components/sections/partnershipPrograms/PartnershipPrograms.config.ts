import { EPartnershipTabs } from '@pages/main/partnerships';
import i18n from 'i18next';

const t = i18n.getFixedT(i18n.language);

export const config = {
  programsCards: [
    {
      id: EPartnershipTabs.affiliate,
      icon: 'affiliate',
      label: t('Affiliate Program'),
      points: [
        t('Mobile optimized marketing tools'),
        t('Dedicated affiliate manager'),
        t('Round-the-clock access to all your analytics'),
      ],
      btnText: t('Sign Up'),
    },
    {
      id: EPartnershipTabs.ib,
      icon: 'brokers',
      label: t('Introducing Brokers'),
      points: [
        t('Multi-level marketing rebate tiers'),
        t('Free market reviews for clients'),
        t('Customizable marketing and advertising tools'),
        t('Local office and events support'),
      ],
      btnText: t('Sign Up'),
    },
  ],
};
