import { Col, Container, Row, SectionBg, Svg } from '@components/shared';
import { config } from '@pages/main/platform';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './PerfectSection.scss';

export const PerfectSection = memo(function PerfectSection() {
  const { t } = useTranslation();

  return (
    <section className="platform-perfect-wrapper">
      <SectionBg primary={config.perfectSectionBg} />
      <Container>
        <Row>
          <Col className="platform-perfect__header">
            <div className="header__title">{config.perfectSectionTitle}</div>
            <div className="header__description">{config.perfectSectionDesc}</div>
          </Col>
          <Col className="platform-perfect__content">
            <div className="content__item">
              <Svg href="pc_install" width={48} className="content__svg" />
              {t('Easy to install')}
            </div>
            <div className="content__item">
              <Svg href="bridge" width={48} className="content__svg" />
              {t('No third party bridges')}
            </div>
            <div className="content__item">
              <Svg href="time_reverse_clock" width={48} className="content__svg" />
              {t('24 5 Trading')}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
