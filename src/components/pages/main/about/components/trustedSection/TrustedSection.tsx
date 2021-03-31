import { Cards, Col, Container, Row } from '@components/shared';
import { config, locale } from '@pages/main/about';
import React, { memo } from 'react';
import './TrustedSection.scss';

export const TrustedSection = memo(function TrustedSection() {
  return (
    <section className="about-wrapper__trusted">
      <Container>
        <Row>
          <Col className="trusted__text">
            <div className="trusted__title">{locale.trustedTitle}</div>
            <div className="trusted__description">{locale.trustedDescription}</div>
          </Col>
          <Col className="trusted__cards-container">
            <Cards
              id="trustedCards"
              className="trusted__cards"
              cards={config.trustedCards}
              cardWrapperClass="card col"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
});
