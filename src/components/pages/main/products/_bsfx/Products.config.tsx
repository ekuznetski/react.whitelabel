import i18n from '@i18next';
import React from 'react';
import { Trans } from 'react-i18next';
import { config as _config } from '../Products.config';
import { EAssetClass } from '@domain/enums';
import { assetsCharacteristics } from '@domain';

const t = i18n.getLazyT;

export const config = {
  ..._config,
  tableSections: _config.tableSections.map((section) => {
    if (section.id === EAssetClass.forex) {
      return {
        ...section,
        points: [
          <Trans i18nKey="Spreads from # pips" values={{ val: assetsCharacteristics[EAssetClass.forex].spread }}>
            Spreads from <b>0.1</b>
          </Trans>,
          ...section.points.slice(1),
        ],
      };
    } else if (section.id === EAssetClass.crypto) {
      return {
        ...section,
        points: [
          ...section.points.slice(-1),
          <>
            <b>60+</b> {t('Cryptocurrencies')}
          </>,
        ],
      };
    } else {
      return section;
    }
  }),
};
