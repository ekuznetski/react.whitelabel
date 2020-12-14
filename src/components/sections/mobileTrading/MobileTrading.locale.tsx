import React from 'react';
import { Trans } from 'react-i18next';

export const locale = {
  mobileTradingTitle: (
    <Trans i18nKey="Mobile Trading Section Title">
      <b>Mobile Trading</b>
      <br />
      With MT4
    </Trans>
  ),
  mobileTradingDescription: (
    <Trans i18nKey="Mobile Trading Section Desc">
      <div className="mb-6">
        Have complete control over your account with our native mobile app; open, close, and manage trading positions
        from your mobile phone.
      </div>
      <div className="mb-6">
        Download MetaTrader 5 for Android/iOS on your smartphone or tablet and trade Forex anytime and anywhere in the
        world!
      </div>
    </Trans>
  ),
};
