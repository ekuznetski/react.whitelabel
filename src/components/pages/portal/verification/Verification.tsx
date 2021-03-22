import { Col, Container, PageTitle, Row, Tab, Tabs } from '@components/shared';
import { EClientStatusCode, EDocumentsType, EVerificationTabs } from '@domain/enums';
import { MClientStatus, MDocuments } from '@domain/models';
import { IStore } from '@store';
import { getCcFilesStatus } from '@utils/fn';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AdditionalInformation, FinancialProfile, UploadDocuments } from './components';
import './Verification.scss';

export const Verification = memo(function Verification() {
  const { t } = useTranslation();
  const { clientStatus, documents } = useSelector<IStore, { clientStatus: MClientStatus; documents: MDocuments }>(
    (state) => ({
      clientStatus: state.data.client.status,
      documents: state.data.client.documents,
    }),
  );
  const initialActiveTab: EVerificationTabs = _getFirstUnverifiedTab();

  function _getFirstUnverifiedTab(): EVerificationTabs {
    if (clientStatus.fp_status.code !== EClientStatusCode.submitted) {
      return EVerificationTabs.FinancialProfile;
    }

    if (
      documents.getDocumentByType(EDocumentsType.ID).code !== EClientStatusCode.submitted ||
      documents.getDocumentByType(EDocumentsType.PoR).code !== EClientStatusCode.submitted
    ) {
      return EVerificationTabs.UploadDocuments;
    }

    const ccFilesStatus = getCcFilesStatus(
      [
        EDocumentsType.CCCopy1,
        EDocumentsType.CCCopy2,
        EDocumentsType.CCCopy3,
        EDocumentsType.CCCopy4,
        EDocumentsType.CCCopy5,
      ],
      documents,
    );
    if (
      ![EClientStatusCode.notApplicable, EClientStatusCode.notRequested].includes(clientStatus.edd_status.code) ||
      ![EClientStatusCode.notApplicable, EClientStatusCode.notRequested].includes(clientStatus.tins_status.code) ||
      ccFilesStatus.code !== EClientStatusCode.submitted
    ) {
      return EVerificationTabs.AdditionalInformation;
    }

    return EVerificationTabs.FinancialProfile;
  }

  return (
    <Container className="client-verification-page-wrapper">
      <Row>
        <Col xs={12}>
          <PageTitle title={t('Verification')} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12}>
          <Tabs className="client-verification__tabs" activeTab={initialActiveTab}>
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
