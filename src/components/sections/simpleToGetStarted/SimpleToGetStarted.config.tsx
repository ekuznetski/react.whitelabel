import i18n from '@i18next';
import React from 'react';
import { Trans } from 'react-i18next';

const t = i18n.getLazyT;

export const config = {
  bg: 'simple-to-get-started.jpg',
  headerTitle: (
    <Trans i18nKey="It's Simple to get started">
      It's Simple <b>to Get Started</b>
    </Trans>
  ),
  headerDescription: t('Start Trading In 3 Easy Steps'),
  steps: [
    {
      title: t('Sign Up'),
      context: t('Start Trading Steps Desc:0'),
    },
    {
      title: t('Explore The Platform'),
      context: t('Start Trading Steps Desc:1'),
    },
    {
      title: t('Start Trading'),
      context: t('Start Trading Steps Desc:2'),
    },
  ],
};
