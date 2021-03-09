import { SectionBg } from '@components/shared';
import { locale } from '@pages/main/leverage';
import React, { memo } from 'react';
import './LeverageTopSection.scss';

export const LeverageTopSection = memo(function LeverageTopSection() {
  return (
    <section className="leverage-wrapper__page-top">
      <SectionBg primary="leverage-page-top.jpg" />
      <div className="container">
        <div className="row">
          <div className="col-md-7 col-lg-5 page-top__header">
            <div className="page-top__title mb-7">{locale.leveragePageTopTitle}</div>
            <div className="page-top__description mb-9">{locale.leveragePageTopDesc}</div>
          </div>
        </div>
      </div>
    </section>
  );
});
