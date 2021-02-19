import { Cards, SectionBg } from '@components/shared';
import { config } from '@pages/main/about';
import React, { memo } from 'react';
import { locale } from '@pages/main/about';
import { useTranslation } from 'react-i18next';
import './InTouchSection.scss';

export const InTouchSection = memo(function InTouchSection() {
  const { t } = useTranslation();

  return (
    <section className="about-wrapper__in-touch">
      <SectionBg img="in-touch-bg.jpg" />
      <div className="container">
        <div className="row">
          <div className="in-touch__header col-lg-8 offset-lg-2 text-center">
            <div className="in-touch__title mb-7">{locale.inTouchSectionTitle}</div>
            <div className="in-touch__description mb-13">{locale.inTouchSectionDescription}</div>
          </div>
          <div className="in-touch__cards-container col-12 col-sm-8 col-md-12 mx-sm-auto">
            <Cards
              id="inTouchCards"
              className="in-touch__cards"
              cards={config.inTouchCards}
              cardWrapperClass="card col-12 col-md-4 mb-9 mb-md-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
});
