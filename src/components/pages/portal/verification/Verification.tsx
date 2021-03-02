import { PageTitle, Tab, Tabs } from '@components/shared';
import React, { memo } from 'react';
import { Col, Container, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { AdditionalInformation, FinancialProfile, UploadDocuments } from './components';
import './Verification.scss';

export const Verification = memo(function Verification() {
  const { t } = useTranslation();

  return (
    <Container className="client-verification-page-wrapper">
      <Row>
        <Col xs={12}>
          <PageTitle title={t('Verification')} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12}>
          <Tabs className="client-verification__tabs" activeTab="financialProfile">
            <Tab label={t('Financial Profile')} anchor="financialProfile">
              <FinancialProfile />
            </Tab>
            <Tab label={t('Upload Documents')} anchor="uploadDocuments">
              <UploadDocuments />
            </Tab>
            <Tab label={t('Additional Information')} anchor="additionalInformation">
              <AdditionalInformation />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
});
