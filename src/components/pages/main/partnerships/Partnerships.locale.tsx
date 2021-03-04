import { files } from '@domain';
import i18n from '@i18next';
import React from 'react';
import { Trans } from 'react-i18next';
const t = i18n.getLazyT;

export const locale = {
  acceptPolicy: (
    <Trans i18nKey="Accept Policy">
      I have read and accept the <a target="_blank" href={files.privacyPolicy}>Privacy Policy</a> of WHITE_LABEL
    </Trans>
  ),
};
