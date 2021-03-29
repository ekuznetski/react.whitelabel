import React from 'react';
import { Trans } from 'react-i18next';

export const config = {
  image: 'platform_devices.png',
  title: (
    <Trans i18nKey="Prestigious Platform Technology Title">
      <b>Harness the power</b>
      <br /> of Metatrader
    </Trans>
  ),
  desc: (
    <Trans i18nKey="Prestigious Platform Technology Desc">
      <p className="mb-3 mb-md-6 mb-lg-9">
        Metatrader is the financial industry's golden standard when it comes to leading platform technology. UINVEX’s
        platform uses Metatrader 5 as a foundation to build an intuitive platform with a pleasant user interface,
        ensuring an excellent user experience, every time.
      </p>
      <p>
        The platform is suitable for all types of traders and features a mobile app, Expert Advisors, and advanced
        technical analysis.
      </p>
    </Trans>
  ),
};
