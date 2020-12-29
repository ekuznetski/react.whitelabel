import { MultipleUpload, UploadDocumentCard, UploadFile, UploadWrapper } from '@components/shared';
import { EDocumentsType } from '@domain/enums';
import { MDocuments } from '@domain/models';
import { IStore } from '@store';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './CreditCardVerification.scss';

export const CreditCardVerification = memo(function CreditCardVerification() {
  const { documents } = useSelector<IStore, { documents: MDocuments }>((state) => ({
    documents: state.data.client.documents,
  }));
  const { t } = useTranslation();

  return (
    <UploadWrapper
      documents={documents.getAllDocumentsOfTypes([
        EDocumentsType.CCFront,
        EDocumentsType.CCBack,
        EDocumentsType.CCCopy,
        EDocumentsType.CCCopy1,
        EDocumentsType.CCCopy2,
        EDocumentsType.CCCopy3,
        EDocumentsType.CCCopy4,
        EDocumentsType.CCCopy5,
      ])}
      className="credit-card-verification"
    >
      <MultipleUpload>
        <UploadFile
          fileType={EDocumentsType.CCFront}
          fieldName={t('Face Side')}
          description="Please cover the 6 middle digits as shown below"
          icon="upload_card_front_drop"
          iconWidth={120}
        />
        <UploadFile
          fileType={EDocumentsType.CCBack}
          fieldName={t('Back Side')}
          description="Please cover the 6 middle digits as shown below"
          icon="upload_card_back_drop"
          iconWidth={120}
        />
      </MultipleUpload>
    </UploadWrapper>
  );
});
