import { LabelView } from '@components/shared';
import { ELabels } from '@domain/enums';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Tabs } from '@components/shared';
import { Trans } from 'react-i18next';
import { AffiliateForm } from '../';
import { config } from '../../';
import './PartnershipFormsSection.scss';

interface IPartnershipFormSectionProps {
  formRef: React.RefObject<HTMLDivElement>;
  activeTab: string;
}

export const PartnershipFormSection = memo(function PartnershipFormSection({
  formRef,
  activeTab,
}: IPartnershipFormSectionProps) {
  return (
    <LabelView>
      {{
        '*': (
          <section className="partnership__forms" ref={formRef}>
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
          <section className="partnership__forms" ref={formRef}>
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
