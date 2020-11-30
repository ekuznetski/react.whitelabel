import { Cards } from '@components/shared';
import { config, locale } from '@pages/main/about';
import React, { memo } from 'react';
import './TrustedSection.scss';

export const TrustedSection = memo(function TrustedSection() {
  return (
    <section className="about-wrapper__trusted">
      <div className="container">
        <div className="row">
          <div className="trusted__text col-lg-8 mx-auto text-center">
            <div className="trusted__title mb-9">{locale.trustedTitle}</div>
            <div className="trusted__description mb-13">{locale.trustedDescription}</div>
          </div>
          <div className="col-12 p-0">
            <Cards
              id="trustedCards"
              className="trusted__cards"
              cards={config.trustedCards}
              cardWrapperClass="card col-12 col-md-6 col-lg-3 mb-9 mb-lg-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
});
