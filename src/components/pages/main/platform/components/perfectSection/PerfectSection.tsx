import { SectionBg, Svg } from '@components/shared';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { config } from '@pages/main/platform';
import './PerfectSection.scss';

export const PerfectSection = memo(function PerfectSection() {
  const { t } = useTranslation();

  return (
    <section className="platform-perfect-wrapper">
      <SectionBg primary={config.perfectSectionBg} />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="perfect__title mb-4">{config.perfectSectionTitle}</div>
            <div className="perfect__description mb-13">{config.perfectSectionDesc}</div>
          </div>
          <div className="col-12 col-lg-8 offset-lg-2 perfect__items">
            <div className="perfect__item pb-7 pb-sm-0">
              <Svg href="pc_install" width={48} className="mb-md-4 mr-5 mr-md-0" />
              {t('Easy to install')}
            </div>
            <div className="perfect__item py-7 py-sm-0">
              <Svg href="bridge" width={48} className="mb-md-4 mr-5 mr-md-0" />
              {t('No third party bridges')}
            </div>
            <div className="perfect__item pt-7 pt-sm-0">
              <Svg href="time_reverse_clock" width={48} className="mb-md-4 mr-5 mr-md-0" />
              {t('24 5 Trading')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
