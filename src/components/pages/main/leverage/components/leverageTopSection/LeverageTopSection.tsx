import React, { memo } from 'react';
import { SectionBg } from '@components/shared';
import { useTranslation } from 'react-i18next';
import './LeverageTopSection.scss';

export const LeverageTopSection = memo(function LeverageTopSection() {
  const { t } = useTranslation();

  return (
    <section className="leverage-wrapper__page-top">
      <SectionBg primary="leverage-page-top.jpg" />
      <div className="container">
        <div className="row">
          <div className="col-md-7 col-lg-5 page-top__header">
            <div className="page-top__title mb-7">{t('Leverage Information')}</div>
            <div className="page-top__description mb-9">{t('Leverage Page Top Desc')}</div>
          </div>
        </div>
      </div>
    </section>
  );
});
