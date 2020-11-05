import { DocsType, MultiUpload, Tab, Tabs, UploadFile, UploadWrapper } from '@components/shared';
import { EDocumentsType } from '@domain/enums';
import { MDocument } from '@domain/models';
import { IStore } from '@store';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './AdditionalInformation.scss';

export const AdditionalInformation = memo(function AdditionalInformation() {
  const { documents } = useSelector<IStore, { documents: MDocument[] }>((state) => ({
    documents: state.data.client.documents,
  }));
  const { t } = useTranslation();
  const docsTypeList: DocsType[] = [
    {
      icon: 'upload_bank_drop',
      label: t('Bank Statement'),
    },
    {
      icon: 'upload_bill_drop',
      label: t('Utility Bill'),
    },
    {
      icon: 'upload_other_drop',
      label: t('Other Documents'),
    },
  ];

  return (
    <div className="additional-information">
      <Tabs className="client-additional-information__tabs" isVertical={true}>
        <Tab label={t('Complete EDD Form')} subLabel={'success'} anchor="eddForm">
          {t('Complete EDD Form')}
        </Tab>
        <Tab label={t('Tax Identification')} anchor="taxIdentification">
          {t('Tax Identification')}
        </Tab>
        <Tab label={t('Debit/Credit Card Verification')} anchor="cardVerification">
          {t('Debit/Credit Card Verification')}
          <UploadWrapper documents={[]} documentsTypeList={docsTypeList}>
            <MultiUpload>
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
            </MultiUpload>
          </UploadWrapper>
        </Tab>
      </Tabs>
    </div>
  );
});
