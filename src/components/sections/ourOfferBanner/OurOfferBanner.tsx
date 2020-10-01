import { Svg } from '@components/shared';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './OurOfferBanner.scss';

export const OurOfferBannerSection = memo(
  forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function OurOfferBannerSection(props, ref) {
    const { t } = useTranslation();

    return (
      <section className={classNames('our-offer-banner-section', props.className)} ref={ref}>
        <Container>
          <Row>
            <Col xs={12} md={4} className="py-8">
              <Svg href="zero_pct.svg" height={48} className="mr-5 mb-md-4 mb-lg-0" />
              {t('Zero Deposit Fees')}
            </Col>
            <Col xs={12} md={4} className="py-8">
              <Svg href="graph.svg" height={48} className="mr-5 mb-md-4 mb-lg-0" />
              {t('1:200 Max Leverage')}
            </Col>
            <Col xs={12} md={4} className="py-8">
              <Svg href="gear_24hr.svg" height={48} className="mr-5 mb-md-4 mb-lg-0" />
              {t('24/5 Customer Support')}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }),
);
