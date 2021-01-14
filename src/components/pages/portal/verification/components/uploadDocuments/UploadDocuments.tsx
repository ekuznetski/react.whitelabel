import { Tab, Tabs } from '@components/shared';
import { EDocumentsType } from '@domain/enums';
import { MDocuments } from '@domain/models';
import { IStore } from '@store';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AddressVerification, IdentityVerification } from '..';
import './UploadDocuments.scss';

enum EUploadDocumentsTabs {
  Identity = 'Identity',
  Address = 'Address',
}

export const UploadDocuments = memo(function UploadDocuments() {
  const { documents } = useSelector<IStore, { documents: MDocuments }>((state) => ({
    documents: state.data.client.documents,
  }));
  const { t } = useTranslation();

  const initialActiveTab = EUploadDocumentsTabs.Identity;

  return (
    <div className="upload-documents">
      <Tabs className="client-upload-documents__tabs" isVertical={true} activeTab={initialActiveTab}>
        <Tab
          label={t('Identity Verification')}
          subLabel={documents.getStatusByDocumentType(EDocumentsType.ID)}
          anchor={EUploadDocumentsTabs.Identity}
        >
          <IdentityVerification />
        </Tab>
        <Tab
          label={t('Address Verification')}
          subLabel={documents.getStatusByDocumentType(EDocumentsType.PoR)}
          anchor={EUploadDocumentsTabs.Address}
        >
          <AddressVerification />
        </Tab>
      </Tabs>
    </div>
  );
});
