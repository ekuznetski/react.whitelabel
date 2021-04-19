import { Button, Col, Container, Row, SectionBg, Svg } from '@components/shared';
import { downloadLinks } from '@domain';
import React, { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import './TopSection.scss';

export const TopSection = memo(function TopSection() {
  const { t } = useTranslation();

  return (
    <section className="page-top">
      <SectionBg primary="platform-page-top.jpg" />
      <Container className="page-top__container">
        <Row>
          <Col className="page-top__column">
            <div className="page-top__title">
              <Trans i18nKey="Platform Page Top Title">
                <div>World-Leading</div>
                <div>MetaTrader Platform</div>
                <div>Powered by AroFX</div>
              </Trans>
            </div>
            <div className="download-buttons">
              <Button className="desktop-button">
                <a href={downloadLinks.mt5.desktop}>{t('Download Desktop Version')}</a>
              </Button>
              <Button className="app-store-link">
                <a href={downloadLinks.mt5.appStore}>
                  <Svg href="app_store_logo" />
                </a>
              </Button>
              <Button className="play-store-link">
                <a href={downloadLinks.mt5.googlePlay}>
                  <Svg href="google_play_logo" />
                </a>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
