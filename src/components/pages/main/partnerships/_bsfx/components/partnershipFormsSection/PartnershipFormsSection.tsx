import React, { memo, useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import { AffiliateForm } from '@pages/main/partnerships/components';
import { useFormsDispatch } from '@pages/main/partnerships';
import './PartnershipFormsSection.scss';

export const PartnershipFormSection = memo(function PartnershipFormSection() {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useFormsDispatch();

  useEffect(() => {
    dispatch({ type: 'registerRef', payload: { formRef: ref } });
  }, []);

  return (
    <section className="partnership__forms" ref={ref}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} xl={7} className="partnership__forms-title">
            <Trans i18nKey="Request Partnership">
              Request <strong>Partnership</strong>
            </Trans>
          </Col>
          <Col xs={12}>
            <AffiliateForm />
          </Col>
        </Row>
      </Container>
    </section>
  );
});
