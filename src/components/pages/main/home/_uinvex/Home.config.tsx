import { config as _config } from '@pages/main/home/Home.config';
import React from 'react';
import i18n from '@i18next';
import { Trans } from 'react-i18next';
import { EAssetClass } from '@domain/enums';
import { assetsCharacteristics } from '@domain';

const t = i18n.getLazyT;

export const config = {
  ..._config,
  priceSectionTabs: [
    {
      name: t('Forex'),
      anchor: EAssetClass.forex,
      info: {
        title: t('Forex'),
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
      anchor: EAssetClass.stocks,
      info: {
        title: t('Stocks'),
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
      name: t('Digital assets'),
      anchor: EAssetClass.crypto,
      info: {
        title: t('Digital assets'),
        desc: t('Product Section Digital Assets Desc'),
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
    height: 100,
    margin: { top: 40 },
    showAssetIcon: true,
  },
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
