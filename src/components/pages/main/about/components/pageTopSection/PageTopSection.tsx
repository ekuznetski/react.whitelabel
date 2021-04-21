import { Button, Col, Container, LocaleLink, Row, SectionBg } from '@components/shared';
import { EPagePath } from '@domain/enums';
import { locale } from '@pages/main/about';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './PageTopSection.scss';

export const PageTopSection = memo(function PageTopSection() {
  const { t } = useTranslation();

  return (
    <section className="about-wrapper__page-top">
      <SectionBg primary="about-page-top.jpg" />
      <Container>
        <Row>
          <Col className="page-top__header">
            <div className="page-top__title">{t('Who Are We')}</div>
            <div className="page-top__description">{t('About Us Page Desc')}</div>
            <Button className="page-top__register-btn">
              <LocaleLink to={EPagePath.Registration}>{locale.pageTopRegisterBtn}</LocaleLink>
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
