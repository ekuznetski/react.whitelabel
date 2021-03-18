import { Tab, Tabs } from '@components/shared';
import { EDocumentsType, EUploadDocumentsTabs } from '@domain/enums';
import { MDocuments } from '@domain/models';
import { IStore } from '@store';
import { getFirstUnverifiedTab } from '@utils/fn';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AddressVerification, IdentityVerification } from '..';
import './UploadDocuments.scss';

export const UploadDocuments = memo(function UploadDocuments() {
  const { documents } = useSelector<IStore, { documents: MDocuments }>((state) => ({
    documents: state.data.client.documents,
  }));
  const { t } = useTranslation();

  const initialActiveTab = getFirstUnverifiedTab();

  return (
    <div className="upload-documents">
      <Tabs className="client-upload-documents__tabs" isVertical={true} activeTab={initialActiveTab.subTab}>
        <Tab
          status={documents.getDocumentByType(EDocumentsType.ID).notificationType}
          label={t('Identity Verification')}
          subLabel={documents.getDocumentByType(EDocumentsType.ID).statusMessage}
          anchor={EUploadDocumentsTabs.Identity}
        >
          <IdentityVerification />
        </Tab>
        <Tab
          status={documents.getDocumentByType(EDocumentsType.PoR).notificationType}
          label={t('Address Verification')}
          subLabel={documents.getDocumentByType(EDocumentsType.PoR).statusMessage}
          anchor={EUploadDocumentsTabs.Address}
        >
          <AddressVerification />
        </Tab>
      </Tabs>
    </div>
  );
});
