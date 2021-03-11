import { MultipleUpload, UploadFile, UploadWrapper } from '@components/shared';
import { EDocumentsType } from '@domain/enums';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './CreditCardVerification.scss';

export const CreditCardVerification = memo(function CreditCardVerification() {
  const { t } = useTranslation();

  return (
    <UploadWrapper
      documentsType={[
        EDocumentsType.CCCopy1,
        EDocumentsType.CCCopy2,
        EDocumentsType.CCCopy3,
        EDocumentsType.CCCopy4,
        EDocumentsType.CCCopy5,
      ]}
      showUploadMoreBtn={true}
      className="credit-card-verification"
    >
      <MultipleUpload label={t('Debit/Credit Card')}>
        <UploadFile
          fileType={EDocumentsType.CCFront}
          fieldName={t('Face Side')}
          description={t('Please cover the 6 middle digits as shown below')}
          icon="upload_card_front_drop"
          iconWidth={120}
        />
        <UploadFile
          fileType={EDocumentsType.CCBack}
          fieldName={t('Back Side')}
          description={t('Please cover the CVV digits as shown below')}
          icon="upload_card_back_drop"
          iconWidth={120}
          optional={true}
        />
      </MultipleUpload>
    </UploadWrapper>
  );
});
