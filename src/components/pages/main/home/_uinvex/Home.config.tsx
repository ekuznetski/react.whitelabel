import { config as _config } from '@pages/main/home/Home.config';
import React from 'react';
import i18n from '@i18next';
import { Trans } from 'react-i18next';

const t = i18n.getLazyT;

export const config = {
  ..._config,
  tradeProductsCards: _config.tradeProductsCards.map((product) => {
    if (product.title === 'Cryptocurrencies') {
      return { ...product, exchange: 'BTCUSD, LTCUSD, ETHUSD, XRPUSD' };
    } else {
      return product;
    }
  }),
  platformTechnologySection: {
    title: (
      <Trans i18nKey="Main Prestigious Platform Technology Title">
        A <b>User Experience</b>
        <br />
        Like No Other
      </Trans>
    ),
    description: (
      <Trans i18nKey="Main Prestigious Platform Technology Desc">
        <p className="mb-6">
          BSFX uses a simple, clean platform provided by Metatrader to ensure excellent user experience. By FX traders,
          for FX traders.
        </p>
        <p>
          Metatrader is considered the forex industry standard because of its <b>leading technology</b>. The platform is
          suitable for all types of traders and features a mobile app, Expert Advisors, and advanced technical analysis.
        </p>
      </Trans>
    ),
  },
  mobileTradingSection: {
    title: (
      <Trans i18nKey="Main Mobile Trading Section Title">
        Trading <b>on the go</b>
      </Trans>
    ),
    description: (
      <Trans i18nKey="Main Mobile Trading Section Desc">
        <div className="mb-6">
          Everything you need to trade in your pocket. Use your smartphone to open and close trading positions, and
          manage your accounts.
        </div>
        <div className="mb-6">
          Download the Metatrader app for your smartphone or tablet and trade wherever you are. Available for Android
          and iOS.
        </div>
      </Trans>
    ),
  },
};
