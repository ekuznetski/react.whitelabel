import { Card, Cards, Container, Row } from '@components/shared';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { useTranslation } from 'react-i18next';
import './OurOfferBanner.scss';

export const OurOfferBannerSection = memo(
  forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function OurOfferBannerSection(props, ref) {
    const { t } = useTranslation();

    return (
      <section className={classNames('our-offer-banner-section', props.className)} ref={ref}>
        <Container>
          <Row className="our-offer__wrapper">
            <Cards id="ourOfferCards" className="our-offer__cards">
              <Card uid={0} header="0%" content={t('Zero Deposit Fees')} wrapperClassName="our-offer__card" />
              <Card uid={1} header="1:500" content={t('Max Leverage')} wrapperClassName="our-offer__card" />
              <Card uid={2} header="24/5" content={t('Customer Support')} wrapperClassName="our-offer__card" />
            </Cards>
          </Row>
        </Container>
      </section>
    );
  }),
);
