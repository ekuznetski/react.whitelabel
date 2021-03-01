import { Button, SectionBg } from '@components/shared';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { usePartnershipState } from '@pages/main/partnerships';
import './PartnershipTopSection.scss';

export const PartnershipTopSection = memo(function PartnershipTopSection() {
  const { t } = useTranslation();
  const { formRef } = usePartnershipState();

  function navigateToForm() {
    formRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="partnership__page-top">
      <SectionBg primary="partnership-page-top.jpg" />
      <Container>
        <Row>
          <Col xs={12} md={7} lg={6} xl={5} className="page-top__header mt-12 mt-lg-18">
            <div className="page-top__title mb-7">{t('Partnerships')}</div>
            <div className="page-top__description mb-9">{t('Partnerships Page Desc')}</div>
            <Button onClick={navigateToForm}>{t('Become a Partner')}</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
