import { Cards, SectionBg } from '@components/shared';
import { config } from '@pages/main/about';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './InTouchSection.scss';

export const InTouchSection = memo(function InTouchSection() {
  const { t } = useTranslation();

  return (
    <section className="about-wrapper__in-touch">
      <SectionBg img="in-touch-bg.jpg" />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center">
            <div className="in-touch__title mb-7">{t('In Touch Section Title')}</div>
            <div className="in-touch__description mb-13">{t('In Touch Section Desc')}</div>
          </div>
          <div className="col-sm-8 col-md-12 mx-sm-auto">
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
