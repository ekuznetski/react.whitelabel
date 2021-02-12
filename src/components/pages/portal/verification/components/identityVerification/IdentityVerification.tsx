import { MultipleUpload, UploadDocumentCard, UploadFile, UploadWrapper } from '@components/shared';
import { EDocumentsType } from '@domain/enums';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './IdentityVerification.scss';

export const IdentityVerification = memo(function IdentityVerification() {
  const { t } = useTranslation();

  return (
    <UploadWrapper documentsType={[EDocumentsType.ID, EDocumentsType.IDBack]} className="identity-verification">
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
