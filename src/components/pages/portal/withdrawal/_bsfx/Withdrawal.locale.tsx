import i18n from 'i18next';
import React from 'react';
import { Trans } from 'react-i18next';
const t = i18n.getFixedT(i18n.language);

export const locale = {
  withdrawalPolicyDesc: null,
  isDormantAlert: (
    <Trans i18nKey="90 inactive days warning">
      You have been inactive for more than 90 days. Please contact us at{' '}
      <a className="a-link" href="mailto:sales@bluesquarefx.com">
        sales@bluesquarefx.com
      </a>{' '}
      to help you re-activate your account
    </Trans>
  ),
};
