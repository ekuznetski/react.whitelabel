import { MultipleUpload, UploadDocumentCard, UploadFile, UploadWrapper } from '@components/shared';
import { EDocumentsType } from '@domain/enums';
import { MDocuments } from '@domain/models';
import { IStore } from '@store';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './AddressVerification.scss';

export const AddressVerification = memo(function AddressVerification() {
  const { documents } = useSelector<IStore, { documents: MDocuments }>((state) => ({
    documents: state.data.client.documents,
  }));
  const { t } = useTranslation();

  return (
    <UploadWrapper documents={documents.getAllDocumentsOfTypes(EDocumentsType.PoR)} className="address-verification">
      <UploadDocumentCard icon="upload_bank" label={t('Bank Statement')}>
        <UploadFile fileType={EDocumentsType.PoR} fieldName={t('Upload')} icon="upload_bank_drop" iconWidth={100} />
      </UploadDocumentCard>
      <UploadDocumentCard icon="upload_bill" label={t('Utility Bill')}>
        <UploadFile fileType={EDocumentsType.PoR} fieldName={t('Upload')} icon="upload_bill_drop" iconWidth={82} />
      </UploadDocumentCard>
      <UploadDocumentCard icon="upload_other" label={t('Other Documents')}>
        <UploadFile fileType={EDocumentsType.PoR} fieldName={t('Upload')} icon="upload_other_drop" iconWidth={100} />
      </UploadDocumentCard>
    </UploadWrapper>
  );
});
