import { MultiUpload, PageTitle, Tab, Tabs, UploadFile } from '@components/shared';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AdditionalInformation } from './components';
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
              <MultiUpload>
                <UploadFile
                  fieldName={t('Front Side')}
                  description="Please cover the 6 middle digits as shown below"
                  icon="shrimp"
                  iconWidth={40}
                />
                <UploadFile
                  fieldName={t('Front Side')}
                  description="Please cover the 6 middle digits as shown below"
                  icon="shrimp"
                  iconWidth={40}
                />
              </MultiUpload>
            </Tab>
            <Tab label={t('Upload Documents')} anchor="uploadDocuments">
              Upload Documents
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
