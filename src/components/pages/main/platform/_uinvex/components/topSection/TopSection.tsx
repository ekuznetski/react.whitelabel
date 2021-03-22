import { Button, Col, Container, Row, SectionBg, Svg } from '@components/shared';
import { downloadLinks } from '@domain';
import React, { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import './TopSection.scss';

export const TopSection = memo(function TopSection() {
  const { t } = useTranslation();

  return (
    <section className="page-top">
      <SectionBg
        primary="header_bg.jpg"
        secondary={{
          xxs: 'header_bg_platform_mobile.png',
          md: 'header_bg_platform_tablet.png',
          lg: 'header_bg_platform_desktop.png',
        }}
      />
      <Container>
        <Row>
          <Col lg={8} xl={7}>
            <div className="page-top__title">
              <Trans i18nKey="Platform Page Top Title">
                <div>Cutting edge</div>
                <div>
                  <b>Metatrader 5</b> platform
                </div>
                <div>
                  powered by <b className="d-lg-none">Uinvex</b>
                  <Svg href="logo" className="d-none d-lg-inline" height={58} />
                </div>
              </Trans>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={5} xl={8} className="download-buttons">
            <Button className="desktop-button">
              <Svg href="download" height={20} className="mr-2" />
              <a href={downloadLinks.mt5.desktop}>{t('Download Desktop Version')}</a>
            </Button>
            <Button className="store-link">
              <a href={downloadLinks.mt5.appStore}>
                <Svg href="app_store_logo" />
              </a>
            </Button>
            <Button className="store-link">
              <a href={downloadLinks.mt5.googlePlay}>
                <Svg href="google_play_logo" />
              </a>
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
