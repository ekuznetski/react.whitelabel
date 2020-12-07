import { env } from '@env';
import { ELabels } from '@domain/enums';
import * as asd from '@utils/hooks';
import i18n from 'i18next';
import React from 'react';
import { Trans } from 'react-i18next';
// import { useLabelView } from '../../../../utils/hooks/useLabelView';

const t = i18n.getFixedT(i18n.language);

export const locale = {
  pageTopRegisterBtn: asd.useLabelView({
    '*': t('Open An Account'),
    [ELabels.bsfx]: t('Start Trading'),
  }),
  trustedTitle: asd.useLabelView({
    '*': t('Trusted Section Title'),
    [ELabels.bsfx]: (
      <Trans i18nKey="Trusted Section Title">
        GLOBAL <strong>TRAINING AND TRADING</strong>
      </Trans>
    ),
  }),
  trustedDescription: asd.useLabelView({
    '*': t('Trusted Section Desc'),
    [ELabels.bsfx]: (
      <Trans i18nKey="Trusted Section Desc">
        We believe in training first and trading second, so we have teamed up with an affordable FX trading training
        academy. Learn how to trade for less than $1 per day at <a href="http://www.yulfx.com">www.bsfx.com</a>. We have
        executives stationed globally to introduce clients to the BSFX platform and welcome them to a $6 trillion-a-day
        FX industry. We believe in giving back to the trading community, so we are1 involved in building training
        stations across the globe to provide an FX education.
      </Trans>
    ),
  }),
};
