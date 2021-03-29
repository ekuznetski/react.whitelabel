import { Button, Img, Svg } from '@components/shared';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from '@components/shared';
import { config } from './';
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
      <section className={classNames('mobile-trading', className)} ref={ref}>
        <Container>
          <Row>
            <Col className="mobile-trading__img">
              <Img src={config.sideImg} />
            </Col>
            <Col className="mobile-trading__content">
              <div className="content__title mb-7">{title || config.title}</div>
              <div className="content__description mb-10">{description || config.description}</div>
              <div className="content__store-links">
                <Button className="ios-store">
                  <a href={config.appStoreLink}>
                    <Svg href="app_store_logo" />
                  </a>
                </Button>
                <Button className="google-store">
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
