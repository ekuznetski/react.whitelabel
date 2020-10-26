import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useUploadDispatch, useUploadState } from '../upload-context';

interface UploadReadyViewProps {
  fieldName: string;
}

export const UploadReadyView = memo(function UploadReadyView({ fieldName }: UploadReadyViewProps) {
  const { fileDataURL, file } = useUploadState();
  const dispatch = useUploadDispatch();
  const { t } = useTranslation();

  return (
    <div className="upload-file__ready-view">
      <div className="upload-file__field-name">{fieldName}</div>
      <div className="upload-file__file-preview my-7 mx-auto" style={{ backgroundImage: `url(${fileDataURL})` }}>
        {!fileDataURL && file?.name?.split('.')?.pop()}
      </div>
      <div className="upload-file__nav">
        <a onClick={() => dispatch({ type: 'removeFile' })}>{t('Upload another document')}</a>
      </div>
    </div>
  );
});
