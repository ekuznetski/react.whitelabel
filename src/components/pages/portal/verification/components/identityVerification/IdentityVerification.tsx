import { MultipleUpload, UploadDocumentCard, UploadFile, UploadWrapper } from '@components/shared';
import { EDocumentsType } from '@domain/enums';
import { MDocuments } from '@domain/models';
import { IStore } from '@store';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './IdentityVerification.scss';

export const IdentityVerification = memo(function IdentityVerification() {
  const { documents } = useSelector<IStore, { documents: MDocuments }>((state) => ({
    documents: state.data.client.documents,
  }));
  const { t } = useTranslation();

  return (
    <UploadWrapper
      documents={documents.getAllDocumentsOfTypes([EDocumentsType.ID, EDocumentsType.IDBack])}
      className="identity-verification"
    >
      <UploadDocumentCard icon="upload_passport" label={t('Your Passport')}>
        <UploadFile
          fileType={EDocumentsType.ID}
          fieldName={t('Front Side')}
          icon="upload_id_front_drop"
          iconWidth={100}
        />
      </UploadDocumentCard>
      <UploadDocumentCard icon="upload_id" label={t('Identity Card (ID)')}>
        <MultipleUpload>
          <UploadFile
            fileType={EDocumentsType.ID}
            fieldName={t('Front Side')}
            icon="upload_id_front_drop"
            iconWidth={100}
          />
          <UploadFile
            fileType={EDocumentsType.IDBack}
            fieldName={t('Back Side')}
            icon="upload_id_back_drop"
            iconWidth={100}
          />
        </MultipleUpload>
      </UploadDocumentCard>
      <UploadDocumentCard icon="upload_driver_licence" label={t('Driver’s License')}>
        <UploadFile
          fileType={EDocumentsType.ID}
          fieldName={t('Front Side')}
          icon="upload_id_front_drop"
          iconWidth={100}
        />
      </UploadDocumentCard>
    </UploadWrapper>
  );
});
