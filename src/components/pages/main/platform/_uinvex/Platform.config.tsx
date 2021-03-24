import React from 'react';
import i18n from '@i18next';
import { Trans } from 'react-i18next';

const t = i18n.getLazyT;

export const config = {
  perfectSectionBg: 'perfect-for-eas.jpg',
  perfectSectionTitle: (
    <Trans i18nKey="Perfect For EAs">
      <b>The perfect match</b> for your EA
    </Trans>
  ),
  perfectSectionDesc: t('Automate your trading strategies'),
};
