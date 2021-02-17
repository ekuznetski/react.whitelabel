/* eslint-disable func-style */
import i18n from '@i18next';
import React from 'react';
import { Trans } from 'react-i18next';
const t = i18n.getLazyT;

export const locale = {
  openLiveAccountBannerTitle: (
    <Trans i18nKey="Banner Section Title">
      Trusted. <br />
      Transparent.
    </Trans>
  ),
};
