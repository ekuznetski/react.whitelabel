import { Button, Img, Svg } from '@components/shared';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { config, locale } from './';
import './MobileTrading.scss';

interface MobileTradingSectionProps {
  title?: string | React.ReactFragment;
  description?: string | React.ReactFragment;
  className?: string;
}

export const MobileTradingSection = memo(
  forwardRef<HTMLDivElement, MobileTradingSectionProps>(function MobileTradingSection(
    { title, description, className },
    ref,
  ) {
    return (
      <section className={classNames('mobile-trading', className)}>
        <Container>
          <Row>
            <Col xs={12} lg={5} className="mb-12 mb-lg-0 mt-12 mb-md-0">
              <Img src="mobile_trading.jpg" />
            </Col>
            <Col xs={12} lg={6} className="offset-lg-1 pt-lg-10 pr-lg-6">
              <div className="mobile-trading__title mb-7">{title || locale.mobileTradingTitle}</div>
              <div className="mobile-trading__description mb-10">{description || locale.mobileTradingDescription}</div>
              <div className="store-links">
                <Button className="mr-md-6 px-7 mb-7 mb-md-0">
                  <a href={config.appStoreLink}>
                    <Svg href="app_store_logo" />
                  </a>
                </Button>
                <Button className="mr-md-6 px-7">
                  <a href={config.googlePlayLink}>
                    <Svg href="google_play_logo" />
                  </a>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }),
);
