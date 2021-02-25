import { LocaleLink, SectionBg } from '@components/shared';
import { EPagePath } from '@domain/enums';
import React, { memo } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import './HomeTopSection.scss';

export const HomeTopSection = memo(function HomeTopSection() {
  const { t } = useTranslation();

  return (
    <section className="page-top">
      <SectionBg primary="header_bg.jpg"  />
      <Container>
        <Row className="mb-9 mb-lg-18">
          <Col xs={12} md={8} lg={6} className="page-top__header">
            <div className="page-top__title mb-5 mb-lg-9">
              {t('Home Page Top Title')}
              123
            </div>
            <div className="page-top__description mb-11 mb-lg-10">
              <Trans i18nKey="Home Page Top Section Desc">
                An online trading experience by FX traders,
                <br /> for FX traders.
              </Trans>
            </div>
            <Button>
              <LocaleLink to={EPagePath.Registration}>{t('Open Live Account')}</LocaleLink>
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
