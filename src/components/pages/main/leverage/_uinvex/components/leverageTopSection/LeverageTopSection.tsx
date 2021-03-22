import { Col, Container, Row, SectionBg } from '@components/shared';
import { locale } from '@pages/main/leverage';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './LeverageTopSection.scss';

export const LeverageTopSection = memo(function LeverageTopSection() {
  const { t } = useTranslation();

  return (
    <section className="leverage-wrapper__page-top">
      <SectionBg
        primary="header_bg.jpg"
        secondary={{
          xxs: 'leverage-page-top-mobile.png',
          md: 'leverage-page-top-tablet.png',
          lg: 'leverage-page-top-desktop.png',
        }}
      />
      <Container className="header-container">
        <Row className="header-row">
          <Col className="page-top__header">
            <div className="page-top__title">{locale.pageTopTitle}</div>
            <div className="page-top__description">{locale.pageTopDesc}</div>
            <div className="note">{t('Leverage Page Top Note')}</div>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
