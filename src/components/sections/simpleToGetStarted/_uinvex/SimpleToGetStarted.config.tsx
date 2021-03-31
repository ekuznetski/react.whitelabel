import i18n from '@i18next';
import { config as _config } from '@sections/simpleToGetStarted/SimpleToGetStarted.config';
import React from 'react';
import { Trans } from 'react-i18next';

const t = i18n.getLazyT;

export const config = {
  ..._config,
  bg: '',
  headerTitle: (
    <Trans i18nKey="It's Simple to get started">
      Easy <br /> as <b>1</b>-<b>2</b>-<b>3</b>
    </Trans>
  ),
};
