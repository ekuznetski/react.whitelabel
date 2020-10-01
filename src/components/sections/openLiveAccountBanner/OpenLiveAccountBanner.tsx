import { Button, SectionBg } from '@components/shared';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './OpenLiveAccountBanner.scss';

export const OpenLiveAccountBannerSection = memo(
  forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function OpenLiveAccountBannerSection(props, ref) {
    const { t } = useTranslation();

    return (
      <section className={classNames('open-live-account-banner', props.className)} ref={ref}>
        <SectionBg img="live-account-bg.png" />
        <Container>
          <Row>
            <Col lg={5} className="mb-12 mb-lg-0">
              <div className="open-live-account-banner__title mb-7">
                {t('Banner Section Title:0')}
                <b>{t('Banner Section Title:1')}</b>
              </div>
              <div className="open-live-account-banner__description">{t('Banner Section Desc')}</div>
            </Col>
            <Col xs={12} lg={3} className="offset-lg-3 open-account mt-12 mt-lg-0">
              <div className="open-live-account-banner__title mb-3">
                <b>{t('Live Account')}</b>
              </div>
              <div className="open-live-account-banner__description mb-8 mb-md-6">{t('Discover Trading Tools')}</div>
              <Button>
                <Link to="/registration">{t('Open Live Account')}</Link>
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }),
);
