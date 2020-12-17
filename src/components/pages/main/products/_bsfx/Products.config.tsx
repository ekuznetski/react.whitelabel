import i18n from 'i18next';
import React from 'react';
import { Trans } from 'react-i18next';
import { config as _config } from '../Products.config';
import { MarketType } from '@domain/enums';

const t = i18n.getFixedT(i18n.language);

export const config = {
  ..._config,
  tableSections: _config.tableSections.map((section) => {
    if (section.id === MarketType.forex) {
      return {
        ...section,
        points: [
          <Trans i18nKey="Spreads from # pips" values={{ val: '1.4' }}>
            Spreads from <b>1.4 pips</b>
          </Trans>,
          <Trans i18nKey="Max Leverage #" values={{ val: '1:500' }}>
            Max. Leverage <b>1:500</b>
          </Trans>,
          <Trans i18nKey="Margins from just #" values={{ val: '0.20%' }}>
            Margins from just <b>0.20%</b>
          </Trans>,
        ],
      };
    } else if (section.id === MarketType.indices) {
      return {
        ...section,
        points: [
          <>
            <b>15+</b> {t('Most Popular Indices Worldwide')}
          </>,
          <Trans i18nKey="Max Leverage #" values={{ val: '1:100' }}>
            Max. Leverage <b>1:100</b>
          </Trans>,
        ],
      };
    } else if (section.id === MarketType.crypto) {
      return {
        ...section,
        points: [
          <Trans i18nKey="Max Leverage #" values={{ val: '1:20' }}>
            Max. Leverage <b>1:20</b>
          </Trans>,
          <>
            <b>60+</b> {t('Cryptocurrencies')}
          </>,
        ],
      };
    } else if (section.id === MarketType.commodities) {
      return {
        ...section,
        points: [
          <Trans i18nKey="Max Leverage #" values={{ val: '1:133' }}>
            Max. Leverage <b>1:67</b>
          </Trans>,
        ],
      };
    } else {
      return section;
    }
  }),
};
