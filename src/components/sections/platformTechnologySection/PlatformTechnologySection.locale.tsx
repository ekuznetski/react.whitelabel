import React from 'react';
import { Trans } from 'react-i18next';

export const locale = {
  platformTechnologyTitle: (
    <Trans i18nKey="Prestigious Platform Technology Title">
      Prestigious MT5 <br /> <b>Platform Technology</b>
    </Trans>
  ),
  platformTechnologyDesc: (
    <Trans i18nKey="Prestigious Platform Technology Desc">
      <p className="mb-6">
        Metatrader is the most popular electronic trading platforms and has long been considered the
        <b> forex industry standard</b> because of its innovative technology.
      </p>
      <p className="mb-6">
        The platform is suitable for traders of all levels and expertise, offering flexible trading systems, a mobile
        app, Expert Advisors, and advanced technical analysis.
      </p>
      <p>
        Compared to its predecessor, MT4 has <b>additional features</b> including 6 types of pending orders, 21
        timeframes to choose from, and an integrated fundamental economic calendar
      </p>
    </Trans>
  ),
};
