import React, { memo } from 'react';
import { SectionBg } from '@components/shared';
import { Trans, useTranslation } from 'react-i18next';
import './EconomicCalendarTopSection.scss';

export const EconomicCalendarTopSection = memo(function EconomicCalendarTopSection() {
  const { t } = useTranslation();

  return (
    <section className="economic-calendar-wrapper__page-top">
      <SectionBg
        primary="header_bg.jpg"
        secondary={{
          xxs: 'economic-calendar-top-mobile.png',
          md: 'economic-calendar-top-tablet.png',
          lg: 'economic-calendar-top-desktop.png',
        }}
      />
      <div className="container">
        <div className="row">
          <div className="col page-top__header">
            <div className="page-top__title">
              <Trans i18nKey="Economic Calendar">
                <b>Economic</b> Calendar
              </Trans>
            </div>
            <div className="page-top__description">{t('Economic Calendar Desc')}</div>
          </div>
        </div>
      </div>
    </section>
  );
});
