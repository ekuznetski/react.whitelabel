import { Img } from '@components/shared';
import i18n from 'i18next';
import React from 'react';
import { config as _config } from '@pages/main/about/About.config';

const t = i18n.getFixedT(i18n.language);

export const config = {
  ..._config,
  tableData: {
    headers: [t('Method'), t('Minimum'), t('Processing'), t('Fees')],
    rows: [
      [<Img src="bank_wire.png" height={40} />, '$250', t('1 to 7 working days'), '$0'],
      [<Img src="visa_mastercard.png" height={40} />, '$20', t('Up to 1 hour'), '$0'],
    ],
    colsPctSize: [20, 20, null, 20],
  },
  trustedCards: [
    {
      header: (
        <>
          300<small>+</small>
        </>
      ),
      content: t('Instruments'),
      uid: 1,
    },
    ..._config.trustedCards.filter((card) => card.uid !== 1),
  ],
};
