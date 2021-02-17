import { Button, LabelView, LocaleLink, SectionBg, Svg } from '@components/shared';
import { ELabels, EPagePath } from '@domain/enums';
import { useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './OpenLiveAccountBanner.scss';
import { locale } from './';

export const OpenLiveAccountBannerSection = memo(
  forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function OpenLiveAccountBannerSection(props, ref) {
    const { t } = useTranslation();
    const responsive = useResponsive();

    return (
      <section className={classNames('open-live-account-banner', props.className)} ref={ref}>
        <SectionBg img="live-account-bg.jpg" />
        <Container>
          <Row>
            <Col lg={5} className="mb-12 mb-lg-0 open-live-account-banner__column">
              <div className="open-live-account-banner__title mb-7">{locale.openLiveAccountBannerTitle}</div>
              <div className="open-live-account-banner__description">{t('Banner Section Desc')}</div>
            </Col>
            <Col xs={12} lg={4} xl={3} className="offset-lg-3 open-account mt-12 mt-lg-0">
              <div className="open-live-account-banner__title mb-3">
                <Svg href="logo" _label={ELabels.uinvex} height={responsive.lg ? 64 : 50} />
                {t('Live Account')}
              </div>
              <div className="open-live-account-banner__description mb-8 mb-md-6">{t('Discover Trading Tools')}</div>
              <Button>
                <LocaleLink to={EPagePath.Registration}>{t('Open Live Account')}</LocaleLink>
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }),
);
