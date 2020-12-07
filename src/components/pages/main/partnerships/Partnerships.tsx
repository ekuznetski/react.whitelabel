import { PartnershipPrograms } from '@components/sections';
import { Button, SectionBg, Tabs } from '@components/shared';
import React, { memo, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import { config } from './';
import './Partnerships.scss';

export const Partnerships = memo(function Partnerships() {
  const [activeTab, setTab] = useState('affiliate');
  const { t } = useTranslation();
  const formRef = useRef<HTMLDivElement>(null);

  function navigateToForm(program?: string) {
    formRef.current && formRef.current.scrollIntoView({ behavior: 'smooth' });
    program && setTab(program);
  }

  return (
    <div className="partnership-wrapper">
      <section className="partnership__page-top">
        <SectionBg img="partnership-page-top.jpg" />
        <Container>
          <Row>
            <Col xs={12} md={7} lg={6} xl={5} className="page-top__header mt-12 mt-lg-18">
              <div className="page-top__title mb-7">{t('Partnerships')}</div>
              <div className="page-top__description mb-9">{t('Partnerships Page Desc')}</div>
              <Button onClick={() => navigateToForm(activeTab)}>{t('Become a Partner')}</Button>
            </Col>
          </Row>
        </Container>
      </section>
      <PartnershipPrograms onNavigate={navigateToForm} />
      <section className="partnership__potential">
        <SectionBg img="potential-bg.jpg" />
        <Container>
          <Row>
            <Col xs={12} lg={9} xl={8}>
              <div className="potential__title mb-lg-9 mb-md-7 mb-3">{t('Maximize Your Earning Potential')}</div>
              <div className="potential__description">
                <Trans i18nKey="Join Our Partnership Program Today">
                  <div className="mb-md-5 mb-3">
                    All our programs are geared up to help you grow your business and maximize your earning potential.
                  </div>
                  <div>
                    Join our partnership program today. Let us design your bespoke partnership program so that you can
                    start earning right away.
                  </div>
                </Trans>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
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
    </div>
  );
});
