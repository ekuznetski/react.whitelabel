import i18n from 'i18next';
import React from 'react';
import { Trans } from 'react-i18next';
import { config as _config } from '../Products.config';

const t = i18n.getFixedT(i18n.language);

export const config = {
  ..._config,
  tableSections: _config.tableSections.map((section) => {
    if (section.title === t('Cryptocurrencies')) {
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
    } else {
      return section;
    }
  }),
};
