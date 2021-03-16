import { config as _config } from '@sections/mobileTrading/MobileTrading.config';
import React from 'react';
import { Trans } from 'react-i18next';

export const config = {
  ..._config,
  sideImg: 'mobile_trading.png',
  mobileTradingTitle: (
    <Trans i18nKey="Mobile Trading Section Title">
      <b>Mobile Trading</b> With MT5
    </Trans>
  ),
  mobileTradingDescription: (
    <Trans i18nKey="Mobile Trading Section Desc">
      <div className="mb-6">Never be far away from your trades again!</div>
      <div className="mb-6">Use a smartphone to manage your account, wherever you may be.</div>
      <div className="mb-6">
        Download the Metatrader 5 app for your smartphone or tablet, available for both Android and iOS.
      </div>
    </Trans>
  ),
};
