/* eslint-disable func-style */
import i18n from '@i18next';
import React from 'react';
import { Trans } from 'react-i18next';
const t = i18n.getLazyT;

export const locale = {
  leveragePageTopTitle: (
    <Trans i18nKey="Leverage Information">
      <b>Leverage</b>
      Information
    </Trans>
  ),
  leveragePageTopDesc: (
    <Trans i18nKey="Leverage Page Top Desc">
      <b>UINVEX</b> offers clients the ability to trade using leverage, allowing them to manage larger trades.
    </Trans>
  ),
  leverageRatiosTitle: t('Leverage Ratios'),
  leverageRatiosDesc: (
    <Trans i18nKey="Leverage Ratios Desc">
      Define your leverage ratio up to a maximum of <b>1:500</b> (Dynamic)
    </Trans>
  ),
};
