import { LocaleLink, SectionBg, Svg } from '@components/shared';
import { ELabels, EPagePath } from '@domain/enums';
import React, { memo } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './TopSection.scss';

export const TopSection = memo(function TopSection() {
  const { t } = useTranslation();

  return (
    <section className="page-top">
      <SectionBg
        primary="header_bg.jpg"
        secondary={{
          xs: 'header_bg_main_mobile.png',
          md: 'header_bg_main_tablet.png',
          lg: 'header_bg_main_desktop.png',
        }}
      />
      <Container className="mb-9">
        <Row>
          <Col xs={12} md={8} xl={6} className="page-top__header">
            <div className="page-top__title mb-6 mb-md-9 mb-lg-11">
              {t('Home Page Top Title')}
              <span className="ml-3">
                <strong className="d-lg-none">Uinvex</strong>
                <Svg href="logo" className="d-none d-lg-inline" _label={ELabels.uinvex} height={58} />
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} lg={5} xl={4} className="pr-0 pr-5">
            <div className="page-top__description mb-10 mb-lg-11">{t('Home Page Top Section Desc')}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button>
              <LocaleLink to={EPagePath.Registration}>{t('Open Live Account')}</LocaleLink>
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
