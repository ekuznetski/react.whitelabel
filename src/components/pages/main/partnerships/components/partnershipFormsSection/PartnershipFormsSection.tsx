import { LabelView } from '@components/shared';
import { ELabels } from '@domain/enums';
import React, { memo, useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Tabs } from '@components/shared';
import { Trans } from 'react-i18next';
import { AffiliateForm } from '..';
import { config } from '@pages/main/partnerships';
import './PartnershipFormsSection.scss';
import { useFormsDispatch, useFormsState } from '../../Partnerships.context';

export const PartnershipFormSection = memo(function PartnershipFormSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { activeTab } = useFormsState();
  const dispatch = useFormsDispatch();

  useEffect(() => {
    dispatch({ type: 'registerRef', payload: { formRef: ref } });
  }, [ref]);

  return (
    <LabelView>
      {{
        '*': (
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
        ),
        [ELabels.bsfx]: (
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
        ),
      }}
    </LabelView>
  );
});
