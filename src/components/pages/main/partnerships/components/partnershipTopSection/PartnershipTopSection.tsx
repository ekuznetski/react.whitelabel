import { Button, SectionBg } from '@components/shared';
import React, { memo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './PartnershipTopSection.scss';

interface IPartnershipTopSectionProps {
  formRef: React.RefObject<HTMLDivElement>;
  activeTab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

export const PartnershipTopSection = memo(function PartnershipTopSection({
  formRef,
  activeTab,
  setTab,
}: IPartnershipTopSectionProps) {
  const { t } = useTranslation();

  function navigateToForm(program?: string) {
    formRef.current && formRef.current.scrollIntoView({ behavior: 'smooth' });
    program && setTab(program);
  }

  return (
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
  );
});
