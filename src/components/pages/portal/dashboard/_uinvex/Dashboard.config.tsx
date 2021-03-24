import i18n from '@i18next';
import React from 'react';
import { Trans } from 'react-i18next';
import { IConfig, config as _config } from '../Dashboard.config';

const t = i18n.getLazyT;

export const config: IConfig = {
  ..._config,
  bonus_cards: [
    {
      type: 'blue',
      bg_img: 'portal-banner-bg.png',
      bg_color: '#eff1f3',
      link: { path: '/deposit', text: t('Deposit Now') },
      text: (
        <Trans i18nKey="Promotional Cards Texts:4">
          Fund Your Account with <span>$0 Fees</span>
        </Trans>
      ),
      title: t('Deposit Now').toUpperCase(),
    },
  ],
};
