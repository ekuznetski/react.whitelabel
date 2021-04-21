import { Cards, Col, Container, Row, SectionBg } from '@components/shared';
import { config } from '@pages/main/about';
import React, { memo } from 'react';
import { locale } from '@pages/main/about';
import { useTranslation } from 'react-i18next';
import './InTouchSection.scss';

export const InTouchSection = memo(function InTouchSection() {
  const { t } = useTranslation();

  return (
    <section className="about-wrapper__in-touch">
      <SectionBg primary="in-touch-bg.jpg" />
      <Container>
        <Row className="in-touch__row">
          <Col className="in-touch__header">
            <div className="in-touch__title">{locale.inTouchSectionTitle}</div>
            <div className="in-touch__description">{locale.inTouchSectionDescription}</div>
          </Col>
          <Col className="in-touch__cards-container">
            <Cards
              id="inTouchCards"
              className="in-touch__cards"
              cards={config.inTouchCards}
              cardWrapperClass="card col"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
});
