import React, { memo, useEffect, useRef } from 'react';
import { Col, Container, Row } from '@components/shared';
import { Tabs } from '@components/shared';
import { Trans } from 'react-i18next';
import { config } from '@pages/main/partnerships';
import './PartnershipFormsSection.scss';
import { usePartnershipDispatch, usePartnershipState } from '@pages/main/partnerships';

export const PartnershipFormSection = memo(function PartnershipFormSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { activeTab } = usePartnershipState();
  const dispatch = usePartnershipDispatch();

  useEffect(() => {
    dispatch({ type: 'registerRef', formRef: ref });
  }, []);

  return (
    <section className="partnership__forms" ref={ref}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} xl={7} className="partnership__forms-title">
            <Trans i18nKey="Choose Your Program">
              CHOOSE YOUR <strong>PROGRAM</strong>
            </Trans>
          </Col>
          <Col xs={12}>
            <Tabs activeTab={activeTab} className="partnership__forms-tabs" {...config.tabsData} />
          </Col>
        </Row>
      </Container>
    </section>
  );
});
