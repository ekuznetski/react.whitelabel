import { MultipleUpload, Tab, Tabs, UploadDocumentCard, UploadFile, UploadWrapper } from '@components/shared';
import { EClientStatusCode, EDocumentsType } from '@domain/enums';
import { MClientData, MClientProfile, MDocument } from '@domain/models';
import { IStore } from '@store';
import { useSetState } from 'ahooks';
import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { EddForm } from '..';
import './AdditionalInformation.scss';

enum EAddInfoTabs {
  edd = 'edd',
  tins = 'tins',
  card = 'card',
}

export const AdditionalInformation = memo(function AdditionalInformation() {
  const { statusData, profile, documents } = useSelector<
    IStore,
    { statusData: MClientData; profile: MClientProfile; documents: MDocument[] }
  >((state) => ({
    statusData: state.data.client.statusData,
    profile: state.data.client.profile,
    documents: state.data.client.documents,
  }));
  const { t } = useTranslation();

  const initialActiveTab =
    (EClientStatusCode.required === statusData.edd_status.code && EAddInfoTabs.edd) ||
    (EClientStatusCode.required === statusData.tins_status.code && EAddInfoTabs.tins) ||
    // EClientStatusCode.required === statusData.card.code && EAddInfoTabs.eddForm ||
    EAddInfoTabs.edd;

  return (
    <div className="additional-information">
      <Tabs className="client-additional-information__tabs" isVertical={true} activeTab={initialActiveTab}>
        <Tab label={t('Complete EDD Form')} subLabel={'success'} anchor={EAddInfoTabs.edd}>
          <EddForm />
        </Tab>
        <Tab label={t('Tax Identification')} anchor={EAddInfoTabs.tins}>
          asd
        </Tab>
        <Tab label={t('Debit/Credit Card Verification')} anchor={EAddInfoTabs.card}>
          <UploadWrapper documents={documents}>
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
        </Tab>
      </Tabs>
    </div>
  );
});
