import { ModalBody, ModalFooter, ModalTitle } from '@components/core';
import { Button, Svg } from '@components/shared';
import { files } from '@domain';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './RewardInformationModal.scss';

export const RewardInformationModal = React.memo(function RewardInformationModal() {
  const { t } = useTranslation();

  return (
    <>
      <ModalTitle title={t('Minimum Requirements')} className="mb-7" />
      <ModalBody className="mt-10 mb-12">
        <Svg href="gift-successful" className="mb-7" />
        {t('Reward Information Desc')}
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => window.open(files.termsOfBusiness, '_blank')}>{t('Read Terms of Business')}</Button>
      </ModalFooter>
    </>
  );
});
