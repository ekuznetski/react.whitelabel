import { Img } from '@components/shared';
import i18n from '@i18next';
import React from 'react';
import { config as _config } from '@pages/main/about/About.config';

const t = i18n.getLazyT;

export const config = {
  ..._config,
  trustedCards: [
    {
      header: (
        <>
          300<span>+</span>
        </>
      ),
      content: t('Instruments'),
      uid: 1,
    },
    { header: 6, content: t('Asset Classes'), uid: 2 },
    { header: 6, content: t('Base Currencies'), uid: 3 },
    {
      header: (
        <>
          12<small>ms</small>
        </>
      ),
      content: t('Avg Execution'),
      uid: 4,
    },
  ],
};
