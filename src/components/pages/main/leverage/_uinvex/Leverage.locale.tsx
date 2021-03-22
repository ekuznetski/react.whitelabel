/* eslint-disable func-style */
import i18n from '@i18next';
import React from 'react';
import { Trans } from 'react-i18next';
const t = i18n.getLazyT;

export const locale = {
  pageTopTitle: (
    <Trans i18nKey="Leverage Information">
      <b>Leverage</b>
      Information
    </Trans>
  ),
  pageTopDesc: (
    <Trans i18nKey="Leverage Page Top Desc">
      <b>UINVEX</b> offers clients the ability to trade using leverage, allowing them to manage larger trades.
    </Trans>
  ),
  ratiosTitle: t('Leverage Ratios'),
  ratiosDesc: (
    <Trans i18nKey="Leverage Ratios Desc">
      Define your leverage ratio up to a maximum of <b>1:500</b> (Dynamic)
    </Trans>
  ),
  openLiveSectionTitle: t('Leverage Open Live Section Title'),
  openAccountDesc: t('Explore Our Products'),
};
