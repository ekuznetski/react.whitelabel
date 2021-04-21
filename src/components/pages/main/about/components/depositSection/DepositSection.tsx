import { Col, Container, DepositCards, Row, Tabs } from '@components/shared';
import { config, locale } from '@pages/main/about';
import { useResponsive } from 'ahooks';
import React, { memo } from 'react';
import './DepositSection.scss';

export const DepositSection = memo(function DepositSection() {
  const responsive = useResponsive();

  return (
    <section className="about-wrapper__deposit">
      <Container>
        <Row>
          <Col className="deposit__header">
            <div className="deposit__title">{locale.depositTitle}</div>
            <DepositCards />
          </Col>
          <Col className="deposit__tabs-container">
            <Tabs className="deposit__tabs" {...config.tabsData(responsive)} />
          </Col>
        </Row>
      </Container>
    </section>
  );
});
