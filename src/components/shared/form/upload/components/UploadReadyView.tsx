import classNames from 'classnames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadViewState, useUploadDispatch, useUploadState } from '../upload-context';

interface UploadReadyViewProps {
  fieldName: string;
}

export const UploadReadyView = memo(function UploadReadyView({ fieldName }: UploadReadyViewProps) {
  const state = useUploadState();
  const dispatch = useUploadDispatch();
  const { t } = useTranslation();

  return (
    <div className="upload-file__ready-view">
      <div className="upload-file__field-title">{state.error || fieldName}</div>
      <div className="upload-file__file-preview my-7 mx-auto" style={{ backgroundImage: `url(${state.fileDataURL})` }}>
        {!state.fileDataURL && state.file?.name?.split('.')?.pop()}
        <div
          className={classNames(
            'upload-file__file-preview__state',
            state.view === UploadViewState.loading && 'upload-file__file-preview__state--loading',
            state.view === UploadViewState.error && 'upload-file__file-preview__state--error',
          )}
        >
          <span />
        </div>
      </div>
      <div className="upload-file__nav">
        <a onClick={() => dispatch({ type: 'removeFile' })}>{t('Upload another document')}</a>
      </div>
    </div>
  );
});
