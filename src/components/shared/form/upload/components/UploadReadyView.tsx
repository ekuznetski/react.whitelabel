import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface UploadReadyViewProps {
  fieldName: string;
  file: File;
}

export const UploadReadyView = memo(function UploadReadyView({ fieldName, file }: UploadReadyViewProps) {
  const { t } = useTranslation();

  return (
    <div className="upload-file__ready-view">
      <div className="upload-file__fieldName">{fieldName}</div>
      <div className="upload-file__file-preview my-9">
        
      </div>
      <div className="upload-file__nav">
        <a onClick={console.log}>{t('Upload another document')}</a>
      </div>
    </div>
  );
});
