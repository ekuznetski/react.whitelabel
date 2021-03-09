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
      <Trans i18nKey="Prestigious Platform Technology Title">
        <b>Harness the power</b>
        <br /> of Metatrader
      </Trans>
    ),
    description: (
      <Trans i18nKey="Prestigious Platform Technology Desc">
        <p className="mb-3 mb-md-6 mb-lg-9">
          Metatrader is the financial industry's golden standard when it comes to leading platform technology. UINVEX’s
          platform uses Metatrader 5 as a foundation to build an intuitive platform with a pleasant user interface,
          ensuring an excellent user experience, every time.
        </p>
        <p>
          The platform is suitable for all types of traders and features a mobile app, Expert Advisors, and advanced
          technical analysis.
        </p>
      </Trans>
    ),
  },
  mobileTradingSection: {
    title: (
      <Trans i18nKey="Mobile Trading Section Title">
        Trade <b>on the move</b>
      </Trans>
    ),
    description: (
      <Trans i18nKey="Mobile Trading Section Desc">
        <div className="mb-8">Never be far away from your trades again!</div>
        <div className="mb-8">Use a smartphone to manage your account, wherever you may be.</div>
        <div className="mb-8">
          Download the Metatrader 5 app for your smartphone or tablet, available for both Android and iOS.
        </div>
      </Trans>
    ),
  },
};
