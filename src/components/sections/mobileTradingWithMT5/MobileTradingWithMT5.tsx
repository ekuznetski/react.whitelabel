import { Button, Img, Svg } from '@components/shared';
import classNames from 'classnames';
import React, { forwardRef, HTMLAttributes, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './MobileTradingWithMT5.scss';

export const MobileTradingWithMT5Section = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function MobileTradingWithMT5Section(props, ref) {
    const { t } = useTranslation();

    return (
      <section className={classNames('mobile-trading-with-mt5', props.className)}>
        <Container>
          <Row>
            <Col xs={12} lg={5} className="mb-12 mb-lg-0 mt-12 mb-md-0">
              <Img src="mobile_trading.jpg" />
            </Col>
            <Col xs={12} lg={6} className="offset-lg-1 pt-lg-10 pr-lg-6">
              <div className="mobile-trading-with-mt5__title mb-7">
                <b>{t('Mobile Trading')}</b>
                <br />
                {t('With MT5')}
              </div>
              <div className="mobile-trading-with-mt5__description mb-10">
                <div className="mb-6">{t('Mobile Trading Section Desc:0')}</div>
                <div className="mb-6">{t('Mobile Trading Section Desc:1')}</div>
              </div>
              <div className="store-links">
                <Button className="mr-md-6 px-7 mb-7 mb-md-0">
                  <Svg href="app_store_logo.svg" />
                </Button>
                <Button className="mr-md-6 px-7">
                  <Svg href="google_play_logo.svg" />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }),
);
