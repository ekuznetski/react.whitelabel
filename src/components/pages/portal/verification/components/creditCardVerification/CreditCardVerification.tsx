import { MultipleUpload, UploadDocumentCard, UploadFile, UploadWrapper } from '@components/shared';
import { EDocumentsType } from '@domain/enums';
import { MDocument } from '@domain/models';
import { IStore } from '@store';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './CreditCardVerification.scss';

export const CreditCardVerification = memo(function CreditCardVerification() {
  const { documents } = useSelector<IStore, { documents: MDocument[] }>((state) => ({
    documents: state.data.client.documents,
  }));
  const { t } = useTranslation();

  return (
    <UploadWrapper documents={documents} className="credit-card-verification">
      <UploadDocumentCard icon="upload_bank" label={t('Bank Statement')}>
        <MultipleUpload>
          <UploadFile
            fileType={EDocumentsType.CCFront}
            fieldName={t('Front Side')}
            description="Please cover the 6 middle digits as shown below"
            icon="shrimp"
            iconWidth={40}
          />
          <UploadFile
            fileType={EDocumentsType.CCBack}
            fieldName={t('Front Side')}
            description="Please cover the 6 middle digits as shown below"
            icon="shrimp"
            iconWidth={40}
          />
        </MultipleUpload>
      </UploadDocumentCard>
      <UploadDocumentCard icon="upload_bill" label={t('Utility Bill')}>
        <UploadFile
          fileType={EDocumentsType.CCFront}
          fieldName={t('Front Side')}
          description="Please cover the 6 middle digits as shown below"
          icon="shrimp"
          iconWidth={40}
        />
      </UploadDocumentCard>
    </UploadWrapper>
  );
});
