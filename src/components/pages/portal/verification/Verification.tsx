import { PageTitle, Tab, Tabs } from '@components/shared';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
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
          <Tabs className="client-verification__tabs">
            <Tab label={t('Financial Profile')} anchor="financialProfile">
              Financial Profile
            </Tab>
            <Tab label={t('Upload Documents')} anchor="uploadDocuments">
              Upload Documents
            </Tab>
            <Tab label={t('Additional Information')} anchor="additionalInformation">
              <Tabs className="client-additional-information__tabs" isVertical={true}>
                <Tab label={t('Complete EDD Form')} subLabel={'success'} labelIcon="coins" anchor="eddForm">
                  Complete EDD Form
                </Tab>
                <Tab label={t('Tax Identification')} anchor="taxIdentification">
                  Tax Identification
                </Tab>
                <Tab label={t('Debit/Credit Card Verification')} anchor="cardVerification">
                  Debit/Credit Card Verification
                </Tab>
              </Tabs>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
});
