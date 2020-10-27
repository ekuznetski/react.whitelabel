import classNames from 'classnames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadViewState, useUploadDispatch, useUploadState } from '../upload-context';

interface UploadReadyViewProps {
  fieldName: string;
}

export const UploadReadyView = memo(function UploadReadyView({ fieldName }: UploadReadyViewProps) {
  const { fileDataURL, file, view } = useUploadState();
  const dispatch = useUploadDispatch();
  const { t } = useTranslation();

  return (
    <div
      className={classNames(
        'upload-file__ready-view',
        view === UploadViewState.loading && 'loading',
        view === UploadViewState.error && 'error',
      )}
    >
      <div className="upload-file__field-name">{fieldName}</div>
      <div className="upload-file__file-preview my-7 mx-auto" style={{ backgroundImage: `url(${fileDataURL})` }}>
        {!fileDataURL && file?.name?.split('.')?.pop()}
        <div className="upload-file__file-preview__loader">
          <span />
        </div>
      </div>
      <div className="upload-file__nav">
        <a onClick={() => dispatch({ type: 'removeFile' })}>{t('Upload another document')}</a>
      </div>
    </div>
  );
});
